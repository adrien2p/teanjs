import { Catch, ExceptionFilter, ArgumentsHost, BadRequestException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        Logger.error(exception.message.message, exception.stack, `${request.method} ${request.url}`);

        response.status(status).json({
            statusCode: status,
            message: exception.message.message,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method
        });
    }
}
