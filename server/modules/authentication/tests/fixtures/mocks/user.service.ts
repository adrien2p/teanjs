import { UserEntity } from '../../../../user/user.entity';
import { fakePassword } from '../data/password.fake';
import { fakeUser } from '../data/user.fake';

export class UserService {
    public async hashPassword(originalPassword: string, defaultSalt?: string): Promise<{ hash: string; salt: string }> {
        return { hash: originalPassword, salt: defaultSalt || fakePassword.salt };
    }

    public async findOneUserOrFail(): Promise<UserEntity> {
        return fakeUser;
    }

    public async findUserById(): Promise<UserEntity> {
        return fakeUser;
    }

    public async findUserByIds(): Promise<UserEntity[]> {
        return [fakeUser];
    }
}
