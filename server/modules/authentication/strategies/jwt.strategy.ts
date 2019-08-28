import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import jwtConfig from '../../../environments/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
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

    public async validate(payload: any): Promise<{ id: number; email: string }> {
        return { id: payload.sub, email: payload.email };
    }
}
