import { EntityNotFoundException } from '../exceptions/entityNotFound.exception';

export const EntityNotFoundExceptionHandler = () => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = async function(...args) {
            try {
                return await originalMethod.apply(this, args);
            } catch (e) {
                if (e.name === 'EntityNotFound') {
                    throw new EntityNotFoundException(e, { target, method: propertyKey });
                }
                throw new Error(e);
            }
        };

        return descriptor;
    };
};
