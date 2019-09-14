import { Catch, ExceptionFilter, ArgumentsHost, BadRequestException, Logger, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { buildResponseError } from '../utilities/buildResponseError';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const message = exception.message.message;

        Logger.error(message, exception.stack, `${request.method} ${request.url}`);

        response.status(status).json(buildResponseError(HttpStatus.BAD_REQUEST, message, request));
    }
}
