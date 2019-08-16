import { TransactionalSoftDeletableRepository } from '../../shared/typeorm/repositories/TransactionalSoftDeletableRepository';
import { User } from './user.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends TransactionalSoftDeletableRepository<User> {}
