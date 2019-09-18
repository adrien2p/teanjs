import * as databaseConfig from '../../../environments/database';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user.service';
import { UserSubscriberEntity } from '../user.subscriber-entity';
import { Connection } from 'typeorm';
import { UserEntity } from '../user.entity';
import { CreateUserDto } from '../dtos/createUser.dto';
import { UserRepository } from '../user.repository';
import { Observable } from 'rxjs';

describe('UserService', () => {
    const fakeUserData: CreateUserDto = {
        email: 'test@test.fr',
        password: 'password'
    };
    let usersService: UserService;
    let connection: Connection;
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [TypeOrmModule.forRoot(databaseConfig), TypeOrmModule.forFeature([UserEntity, UserRepository])],
            providers: [UserService, UserSubscriberEntity]
        }).compile();

        usersService = module.get<UserService>(UserService);
        connection = module.get<Connection>(getConnectionToken());
    });

    afterEach(async () => {
        await connection.query('DELETE FROM users');
    });

    afterAll(async () => {
        await module.close();
    });

    it('should return a hash/salt from a string', async () => {
        const { hash, salt }: { hash: string; salt: string } = await usersService.hashPassword('password');

        expect(hash).not.toBeUndefined();
        expect(salt).not.toBeUndefined();
    });

    it('should return the new created user', (done: () => void) => {
        const user$: Observable<UserEntity> = usersService.createUser(fakeUserData);

        user$.subscribe(user => {
            expect(user).toBeTruthy();
            done();
        });
    });

    describe('find user', () => {
        let user: UserEntity;

        beforeEach((done: () => void) => {
            usersService.createUser(fakeUserData).subscribe((userCreated: UserEntity) => {
                user = userCreated;
                done();
            });
        });

        it('should return a user without failing when searching with conditions', (done: () => void) => {
            const user$: Observable<UserEntity> = usersService.findOneUser({ where: { id: user.id } });

            user$.subscribe((userFound: UserEntity) => {
                expect(userFound).toBeTruthy();
                expect(userFound.id).toBe(user.id);
                done();
            });
        });

        it('should return an array of user when searching by ids', (done: () => void) => {
            const users$: Observable<UserEntity[]> = usersService.findUserByIds([user.id]);

            users$.subscribe((usersFound: UserEntity[]) => {
                expect(usersFound.length).toBe(1);
                expect(usersFound[0]).toBeTruthy();
                expect(usersFound[0].id).toBe(user.id);
                done();
            });
        });

        it('should return a unique user with only selectable column when searching by id', (done: () => void) => {
            const user$: Observable<UserEntity> = usersService.findUserById(user.id);

            user$.subscribe((userFound: UserEntity) => {
                expect(userFound).toBeTruthy();
                expect(userFound.id).toBe(user.id);
                expect(userFound.password).toBeUndefined();
                expect(userFound.salt).toBeUndefined();
                done();
            });
        });
    });
});
