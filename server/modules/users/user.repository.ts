import { TransactionalSoftDeletableRepository } from '../../common/typeorm/repositories/TransactionalSoftDeletableRepository';
import { UserEntity } from './user.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(UserEntity)
export class UserRepository extends TransactionalSoftDeletableRepository<UserEntity> {}
