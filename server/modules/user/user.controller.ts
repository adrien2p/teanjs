import { Response } from 'express';
import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards, HttpCode } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserEntity } from './user.entity';

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    public create(@Body() createUserDto: CreateUserDto, @Res() res: Response): Observable<Response> {
        const user$ = this.usersService.createUser(createUserDto);
        return user$.pipe(map((user: UserEntity) => res.send(user)));
    }

    @Get(':id')
    @UseGuards(AuthGuard())
    @HttpCode(HttpStatus.FOUND)
    public findOne(@Param('id') id: number, @Res() res: Response): Observable<Response> {
        const user$ = this.usersService.findUserById(id);
        return user$.pipe(map((user: UserEntity) => res.send(user)));
    }
}
