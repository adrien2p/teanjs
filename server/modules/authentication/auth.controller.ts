import { Response } from 'express';
import { Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoggedInUserDecorator } from '../../common/decorators/loggedInUser.decorator';
import { UserEntity } from '../users/user.entity';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UseGuards(AuthGuard('local'))
    public async login(@LoggedInUserDecorator() user: UserEntity, @Res() res: Response): Promise<any> {
        const { access_token } = await this.authService.login(user);

        res.cookie('access_token', access_token);
        return res.status(HttpStatus.OK).json({ access_token });
    }
}
