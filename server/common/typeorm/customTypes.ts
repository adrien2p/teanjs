import { EntityManager, FindConditions, FindManyOptions, FindOneOptions, RemoveOptions, SaveOptions } from 'typeorm';

export type CustomSaveOptions = SaveOptions & { transactionalEntityManager?: EntityManager };
export type CustomNoReloadSaveOptions = CustomSaveOptions & { reload: false };

export type CustomFindManyOptions<T> = FindManyOptions<T> & { transactionalEntityManager?: EntityManager };
export type CustomForceFindManyOptions<T> = FindManyOptions<T> & {
    force?: boolean;
    transactionalEntityManager?: EntityManager;
};

export type CustomFindConditions<T> = FindConditions<T> & { transactionalEntityManager?: EntityManager };
export type CustomForceFindConditions<T> = FindConditions<T> & {
    force?: boolean;
    transactionalEntityManager?: EntityManager;
};

export type CustomFindOneOptions<T> = FindOneOptions<T> & { transactionalEntityManager?: EntityManager };

export type CustomRemoveOptions = RemoveOptions & { transactionalEntityManager?: EntityManager };
