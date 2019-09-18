import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import jwtConfig from '../../../environments/jwt';
import { UserService } from '../../user/user.service';
import { UserEntity } from '../../user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                req => {
                    if (req && req.cookies) {
                        return req.cookies['access_token'];
                    }
                    return null;
                }
            ]),
            ignoreExpiration: false,
            secretOrKey: jwtConfig.secret
        });
    }

    public async validate(payload: any): Promise<UserEntity> {
        return await this.userService.findUserById(payload.sub).toPromise();
    }
}
