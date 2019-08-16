import { EntityManager, FindConditions, ObjectID, ObjectLiteral, UpdateResult } from 'typeorm';
import { TransactionalRepository } from './TransactionalRepository';
import { CustomFindOneOptions, CustomForceFindConditions, CustomForceFindManyOptions } from '../customTypes';

export class TransactionalSoftDeletableRepository<Entity extends ObjectLiteral> extends TransactionalRepository<
    Entity
> {
    public async findByIds<T extends Entity>(
        ids: any[],
        options: CustomForceFindManyOptions<Entity> | CustomForceFindConditions<Entity> = {}
    ): Promise<T[]> {
        options = this.softDeletableOptionsUpdate(options);
        return await super.findByIds(ids, options);
    }

    public async count(options?: CustomForceFindManyOptions<Entity>): Promise<number>;
    public async count(
        options: CustomForceFindManyOptions<Entity> | CustomForceFindConditions<Entity> = {}
    ): Promise<number> {
        options = this.softDeletableOptionsUpdate(options);
        return await super.count(options);
    }

    public async findOneOrFail(
        id?: string | number | Date | ObjectID,
        options?: CustomFindOneOptions<Entity>
    ): Promise<Entity>;
    public async findOneOrFail(options?: CustomFindOneOptions<Entity>): Promise<Entity>;
    public async findOneOrFail(
        idsOrOptionsOrConditions?:
            | string
            | number
            | Date
            | ObjectID
            | CustomFindOneOptions<Entity>
            | CustomForceFindConditions<Entity>,
        options: CustomFindOneOptions<Entity> = {}
    ): Promise<Entity> {
        options = this.softDeletableOptionsUpdate(options);
        return await super.findOneOrFail(idsOrOptionsOrConditions as any, options);
    }

    public async delete(
        criteria:
            | string
            | string[]
            | number
            | number[]
            | Date
            | Date[]
            | ObjectID
            | ObjectID[]
            | FindConditions<Entity>,
        transactionalEntityManager?: EntityManager
    ): Promise<UpdateResult> {
        const manager = transactionalEntityManager || this.manager;
        return await manager.update(this.metadata.target as any, criteria, { deletedAt: new Date() });
    }

    public async undoDelete(
        criteria:
            | string
            | string[]
            | number
            | number[]
            | Date
            | Date[]
            | ObjectID
            | ObjectID[]
            | FindConditions<Entity>,
        transactionalEntityManager?: EntityManager
    ): Promise<UpdateResult> {
        const manager = transactionalEntityManager || this.manager;
        return await manager.update(this.metadata.target as any, criteria, { deletedAt: null });
    }

    protected softDeletableOptionsUpdate(options: any = {}): any {
        if (!options.force) {
            options.where = Object.assign({}, options.where, { deletedAt: null });
        }
        return options;
    }
}
