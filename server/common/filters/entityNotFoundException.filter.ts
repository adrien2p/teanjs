import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundException } from '../exceptions/entityNotFound.exception';

@Catch(EntityNotFoundException)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: EntityNotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const { target, method } = exception.context;
        const contextDescriptor = `${target.constructor.name}#${method}`;
        Logger.error(exception.message, exception.stack, `${request.method} ${request.url} -> ${contextDescriptor}`);

        response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: exception.message,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method
        });
    }
}
