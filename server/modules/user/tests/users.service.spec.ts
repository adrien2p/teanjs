import * as databaseConfig from '../../../environments/database';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user.service';
import { UserSubscriberEntity } from '../user.subscriber-entity';
import { Connection } from 'typeorm';
import { UserEntity } from '../user.entity';
import { CreateUserDto } from '../dtos/createUser.dto';
import { UserRepository } from '../user.repository';

describe('UserService', () => {
    const fakeUserData: CreateUserDto = {
        email: 'test@test.fr',
        password: 'password'
    };
    let usersService!: UserService;
    let connection!: Connection;
    let module!: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [TypeOrmModule.forRoot(databaseConfig), TypeOrmModule.forFeature([UserEntity, UserRepository])],
            providers: [UserService, UserSubscriberEntity]
        }).compile();

        usersService = module.get<UserService>(UserService);
        connection = module.get<Connection>(getConnectionToken());
    });

    afterEach(async () => {
        await connection.query('DELETE FROM user');
    });

    afterAll(async () => {
        await connection.close();
        await module.close();
    });

    it('should return a hash/salt from a string', async () => {
        const { hash, salt } = await usersService.hashPassword('password');

        expect(hash).not.toBeUndefined();
        expect(salt).not.toBeUndefined();
    });

    it('should return the new created user', async () => {
        const user = await usersService.createUser(fakeUserData);

        expect(user).toBeTruthy();
    });

    describe('find user', () => {
        let user!: UserEntity;

        beforeEach(async () => {
            user = await usersService.createUser(fakeUserData);
        });

        it('should return an array of user', async () => {
            const usersFound = await usersService.findUserByIds([user.id]);

            expect(usersFound.length).toBe(1);
            expect(usersFound[0]).toBeTruthy();
            expect(usersFound[0].id).toBe(user.id);
        });

        it('should return a unique user with only selectable column', async () => {
            const userFound = await usersService.findUserById(user.id);

            expect(userFound).toBeTruthy();
            expect(userFound.id).toBe(user.id);
            expect(userFound.password).toBeUndefined();
            expect(userFound.salt).toBeUndefined();
        });
    });
});
