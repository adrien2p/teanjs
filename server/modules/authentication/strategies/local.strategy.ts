import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserEntity } from '../../user/user.entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email'
        });
    }

    public validate(email: string, password: string): Observable<UserEntity> {
        return this.authService.validateUser(email, password).pipe(
            map((user: UserEntity | null) => {
                if (!user) {
                    throw new UnauthorizedException();
                }
                return user;
            })
        );
    }
}
