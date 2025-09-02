import { EntityNotFoundException } from '../../exceptions/entityNotFound.exception';
import { isObservable, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const throwIfEntityNotFoundError = (e: any, target: any, propertyKey: string): never => {
    if (e.name === 'EntityNotFound') {
        throw new EntityNotFoundException('Unable to find the requested entity', { target, method: propertyKey });
    }
    throw new Error(e);
};

export const EntityNotFoundExceptionHandler: () => (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) => PropertyDescriptor = () => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = function(...args: any[]): Promise<any> | Observable<any> | undefined {
            try {
                const methodResult = originalMethod.apply(this, args);
                if (isObservable(methodResult)) {
                    return methodResult.pipe(catchError(e => throwIfEntityNotFoundError(e, target, propertyKey)));
                }
                return methodResult;
            } catch (e) {
                throwIfEntityNotFoundError(e, target, propertyKey);
            }
        };

        return descriptor;
    };
};
