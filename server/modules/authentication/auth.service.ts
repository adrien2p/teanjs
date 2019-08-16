import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

    public async validateUser(email: string, pass: string): Promise<User> {
        const user = await this.usersService.findOneUserOrFail({
            where: { email },
            select: ['id', 'password', 'salt']
        });
        const { hash: hashedPassword } = await this.usersService.hashPassword(pass, user.salt);

        if (user && user.password === hashedPassword) {
            return await this.usersService.findUserById(user.id);
        }
        return null;
    }

    public async login(user: User) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
