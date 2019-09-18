import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundException } from '../exceptions/entityNotFound.exception';
import { buildResponseError } from '../utilities/buildResponseError';

@Catch(EntityNotFoundException)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: EntityNotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const message = exception.message;

        const { target, method } = exception.context;
        const contextDescriptor = `${target.constructor.name}::${method}`;
        Logger.error(message, exception.stack, `${request.method} ${request.url} -> ${contextDescriptor}`);

        response.status(HttpStatus.BAD_REQUEST).json(buildResponseError(HttpStatus.BAD_REQUEST, message, request));
    }
}
