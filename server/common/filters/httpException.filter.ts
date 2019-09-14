import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundException } from '../exceptions/entityNotFound.exception';
import { buildResponseError } from '../utilities/buildResponseError';

@Catch(EntityNotFoundException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const message = (exception as any).message;

        Logger.error(message, (exception as any).stack, `${request.method} ${request.url}`);

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        response.status(status).json(buildResponseError(status, message, request));
    }
}
