import { TransactionalSoftDeletableRepository } from '../../common/typeorm/repositories/TransactionalSoftDeletableRepository';
import { UserEntity } from './user.entity';
import { EntityRepository } from 'typeorm';
import { Observable, of } from 'rxjs';
import { UserRole } from './user.const';

@EntityRepository(UserEntity)
export class UserRepository extends TransactionalSoftDeletableRepository<UserEntity> {
    public canAccess(user: UserEntity, loggedInUser: UserEntity): Observable<boolean> {
        let proceed = true;
        if (loggedInUser.role !== UserRole.ADMIN) {
            proceed = user.id === loggedInUser.id;
        }
        return of(proceed);
    }
}
