import * as databaseConfig from '../../../environments/database';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users.service';
import { UserSubscriberEntity } from '../user.subscriber-entity';
import { Connection } from 'typeorm';
import { UserEntity } from '../user.entity';
import { CreateUserDto } from '../dtos/createUser.dto';
import { UserRepository } from '../user.repository';

describe('UsersService', () => {
    const fakeUserData: CreateUserDto = {
        email: 'test@test.fr',
        password: 'password'
    };
    let usersService!: UsersService;
    let connection!: Connection;
    let module!: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [TypeOrmModule.forRoot(databaseConfig), TypeOrmModule.forFeature([UserEntity, UserRepository])],
            providers: [UsersService, UserSubscriberEntity]
        }).compile();

        usersService = module.get<UsersService>(UsersService);
        connection = module.get<Connection>(getConnectionToken());
    });

    afterEach(async () => {
        await connection.query('DELETE FROM users');
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

    it('should return the new created users', async () => {
        const user = await usersService.createUser(fakeUserData);

        expect(user).toBeTruthy();
    });

    describe('find users', () => {
        let user!: UserEntity;

        beforeEach(async () => {
            user = await usersService.createUser(fakeUserData);
        });

        it('should return an array of users', async () => {
            const usersFound = await usersService.findUserByIds([user.id]);

            expect(usersFound.length).toBe(1);
            expect(usersFound[0]).toBeTruthy();
            expect(usersFound[0].id).toBe(user.id);
        });

        it('should return a unique users with only selectable column', async () => {
            const userFound = await usersService.findUserById(user.id);

            expect(userFound).toBeTruthy();
            expect(userFound.id).toBe(user.id);
            expect(userFound.password).toBeUndefined();
            expect(userFound.salt).toBeUndefined();
        });
    });
});
