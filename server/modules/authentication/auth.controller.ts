import { Response } from 'express';
import { Controller, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoggedInUserDecorator } from '../../common/decorators/loggedInUser.decorator';
import { UserEntity } from '../user/user.entity';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { COOKIE } from '../../common/enums/cookie.enum';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UseGuards(AuthGuard('local'))
    @HttpCode(HttpStatus.OK)
    public login(@LoggedInUserDecorator() user: UserEntity, @Res() res: Response): Observable<Response> {
        return this.authService.login(user).pipe(
            map(({ access_token }: { access_token: string }) => {
                res.cookie(COOKIE.ACCESS_TOKEN, access_token);
                return res.send({ access_token });
            })
        );
    }

    @Post('logout')
    @UseGuards(AuthGuard())
    @HttpCode(HttpStatus.OK)
    public logout(@Res() res: Response): Response {
        return res.clearCookie(COOKIE.ACCESS_TOKEN).send('logout successfully');
    }
}
