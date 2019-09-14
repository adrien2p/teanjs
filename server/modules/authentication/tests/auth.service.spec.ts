import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UserService } from './fixtures/mocks/user.service';
import { UserEntity } from '../../user/user.entity';
import { fakeCredentials } from './fixtures/data/credentials.fake';
import { fakeUser } from './fixtures/data/user.fake';
import { JwtService } from './fixtures/mocks/jwt.service';
import { Observable } from 'rxjs';

describe('AuthService', () => {
    let authService: AuthService;
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            providers: [AuthService, UserService, JwtService]
        }).compile();

        authService = module.get<AuthService>(AuthService);
    });

    afterAll(async () => {
        await module.close();
    });

    it('should validate a user', (done: () => void) => {
        const user$: Observable<UserEntity | null> = authService.validateUser(
            fakeCredentials.email,
            fakeCredentials.password
        );

        user$.subscribe((user: UserEntity | null) => {
            expect(user).toBe(fakeUser);
            done();
        });
    });

    it('should not validate a user', (done: () => void) => {
        const user$: Observable<UserEntity | null> = authService.validateUser(fakeCredentials.email, 'wrongpassword');

        user$.subscribe((user: UserEntity | null) => {
            expect(user).toBe(null);
            done();
        });
    });
});
