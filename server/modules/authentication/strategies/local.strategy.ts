import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserEntity } from '../../user/user.entity';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email'
        });
    }

    public async validate(email: string, password: string): Promise<UserEntity> {
        return await this.authService
            .validateUser(email, password)
            .pipe(
                catchError(() => of(null)),
                map((user: UserEntity | null) => {
                    if (!user) {
                        throw new UnauthorizedException();
                    }
                    return user;
                })
            )
            .toPromise();
    }
}
