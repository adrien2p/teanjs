import { UserEntity } from '../../../../user/user.entity';

export const fakeUser: UserEntity = {
    id: 1,
    email: 'fake@test.fr',
    salt: 'djqizeomcjqzemfgoivjzq',
    password: 'cfejzoifcjkezicvozeqjcvzeqoimvc,',
    role: 'customer',
    flags: [],
    createdAt: new Date()
};
