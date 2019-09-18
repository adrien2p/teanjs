import { Request } from 'express';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../../modules/user/user.service';
import { UserEntity } from '../../modules/user/user.entity';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class FetchRequestedUserGuard implements CanActivate {
    constructor(private readonly userService: UserService) {}

    canActivate(context: ExecutionContext): Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const userId: number = Number(request.params.userId);
        const loggedInUser: UserEntity = request.user as UserEntity;

        return this.userService.findUserById(userId).pipe(
            map((user: UserEntity) => ((request as any).requestedUser = user)),
            switchMap((user: UserEntity) => this.userService.canAccessUser(user, loggedInUser))
        );
    }
}
