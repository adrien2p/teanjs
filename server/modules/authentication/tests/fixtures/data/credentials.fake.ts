import { fakeUser } from './user.fake';
import { fakePassword } from './password.fake';

export const fakeCredentials = {
    email: fakeUser.email,
    password: fakePassword.hash
};
