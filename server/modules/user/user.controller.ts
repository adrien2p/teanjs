import { Response } from 'express';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserEntity } from './user.entity';
import { LoggedInUser } from '../../common/decorators/loggedInUser.decorator';
import { RequestedUser } from '../../common/decorators/requestedUser.decorator';
import { FetchRequestedUserGuard } from '../../common/guards/fetchRequestedUser.guard';

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    public create(@Body() createUserDto: CreateUserDto, @Res() res: Response): Observable<Response> {
        const user$ = this.usersService.createUser(createUserDto);
        return user$.pipe(map((user: UserEntity) => res.send(user)));
    }

    @Get(':userId')
    @UseGuards(AuthGuard(), FetchRequestedUserGuard)
    @HttpCode(HttpStatus.FOUND)
    public findOne(
        @LoggedInUser() loggedInUser: UserEntity,
        @RequestedUser() user: UserEntity,
        @Param('id') id: number,
        @Res() res: Response
    ): Response {
        return res.send(user);
    }
}
