import * as crypto from 'crypto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './user.entity';
import { EntityManager } from 'typeorm';
import { UserRepository } from './user.repository';
import { CustomFindManyOptions, CustomFindOneOptions } from '../../common/typeorm/customTypes';
import { EntityNotFoundExceptionHandler } from '../../common/decorators/exceptionHanlders/entityNotFound.exception-handler.decorator';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    public async hashPassword(
        originalPassword: string,
        defaultSalt?: string | undefined
    ): Promise<{ hash: string; salt: string }> {
        const len = 128;
        const iterations = 30547;

        const generateSalt = (): Promise<string> => {
            return new Promise((resolve, reject) => {
                crypto.randomBytes(len, (saltError, saltValue) => {
                    if (saltError) {
                        return reject(saltError);
                    }

                    return resolve(saltValue.toString('base64'));
                });
            });
        };

        return await new Promise(async (resolve, reject) => {
            const saltStr = defaultSalt || (await generateSalt());
            crypto.pbkdf2(originalPassword, saltStr, iterations, len, 'sha1', (hashError, hashPassword) => {
                if (hashError) {
                    return reject(hashError);
                }

                return resolve({
                    salt: saltStr,
                    hash: hashPassword.toString('base64')
                });
            });
        });
    }

    public createUser(
        createUserDto: CreateUserDto,
        options: { transactionalEntityManager?: EntityManager } = {}
    ): Observable<UserEntity> {
        const userCount$: Observable<number> = from(
            this.userRepository.count({
                where: { email: createUserDto.email },
                ...options,
                force: true
            })
        );

        return userCount$.pipe(
            map((count: number) => {
                if (count) {
                    throw new BadRequestException('This email is already use.');
                }
                return this.userRepository.create(createUserDto);
            }),
            switchMap((user: UserEntity) => from(this.userRepository.save(user, options))),
            switchMap((user: UserEntity) => this.userRepository.findOneOrFail(user.id, options))
        );
    }

    @EntityNotFoundExceptionHandler()
    public findOneUserOrFail(options: CustomFindOneOptions<UserEntity> = {}): Observable<UserEntity> {
        return from(this.userRepository.findOneOrFail(options)).pipe(map((user: UserEntity) => user));
    }

    @EntityNotFoundExceptionHandler()
    public findUserById(id: number, options: CustomFindOneOptions<UserEntity> = {}): Observable<UserEntity> {
        return from(this.userRepository.findOneOrFail(id, options)).pipe(map((user: UserEntity) => user));
    }

    public findUserByIds(ids: number[], options: CustomFindManyOptions<UserEntity> = {}): Observable<UserEntity[]> {
        return from(this.userRepository.findByIds(ids, options)).pipe(map((users: UserEntity[]) => users));
    }
}
