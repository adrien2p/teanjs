import { DeepPartial, EntityManager, ObjectLiteral, Repository, ObjectID, FindConditions } from 'typeorm';
import {
    CustomFindConditions,
    CustomFindManyOptions,
    CustomFindOneOptions,
    CustomNoReloadSaveOptions,
    CustomSaveOptions
} from '../customTypes';

export class TransactionalRepository<Entity extends ObjectLiteral> extends Repository<Entity> {
    public async save<T extends DeepPartial<Entity>>(
        entity: T,
        options?: CustomSaveOptions | CustomNoReloadSaveOptions
    ): Promise<T>;
    public async save<T extends DeepPartial<Entity>>(
        entityOrEntities: T | T[],
        options: CustomSaveOptions | CustomNoReloadSaveOptions = {}
    ): Promise<T | T[]> {
        const manager = this.getManager(options);
        return await manager.save<T>(this.metadata.target as any, entityOrEntities as any, options);
    }

    public async findByIds<T extends Entity>(
        ids: any[],
        options: CustomFindManyOptions<Entity> | CustomFindConditions<Entity> = {}
    ): Promise<T[]> {
        const manager = this.getManager(options);
        return await manager.findByIds(this.metadata.target as any, ids, options as any);
    }

    public async count(options?: CustomFindManyOptions<Entity>): Promise<number>;
    public async count(
        optionsOrConditions?: CustomFindManyOptions<Entity> | CustomFindConditions<Entity>
    ): Promise<number> {
        const manager = this.getManager(optionsOrConditions);
        return await manager.count(this.metadata.target as any, optionsOrConditions as any);
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
            | CustomFindConditions<Entity>,
        options?: CustomFindOneOptions<Entity>
    ): Promise<Entity> {
        const manager = this.getManager(idsOrOptionsOrConditions);
        return await manager.findOneOrFail(this.metadata.target as any, idsOrOptionsOrConditions as any);
    }

    protected getManager(options: any): EntityManager {
        return (options && options.transactionalEntityManager) || this.manager;
    }
}
