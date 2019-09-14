import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/user.entity';
import { from, Observable, of } from 'rxjs';
import { map, switchAll, switchMap, mergeAll, mergeMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) {}

    public validateUser(email: string, pass: string): Observable<UserEntity | null> {
        const user$: Observable<UserEntity> = from(
            this.usersService.findOneUserOrFail({
                where: { email },
                select: ['id', 'password', 'salt']
            })
        );

        return user$.pipe(
            map((user: UserEntity) => {
                return from(this.usersService.hashPassword(pass, user.salt)).pipe(
                    map(v => ({ passwordHash: v.hash, user }))
                );
            }),
            mergeAll(),
            mergeMap(({ passwordHash, user }: { passwordHash: string; user: UserEntity }) => {
                if (user && user.password === passwordHash) {
                    return from(this.usersService.findUserById(user.id));
                }
                return of(null);
            })
        );
    }

    public login(user: UserEntity): Observable<{ access_token: string }> {
        const payload = { email: user.email, sub: user.id };
        return of({
            access_token: this.jwtService.sign(payload)
        });
    }
}
