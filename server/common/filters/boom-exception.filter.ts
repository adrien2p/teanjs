import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { BoomException } from '../exceptions/BoomException';

@Catch(BoomException)
export class BoomExceptionFilter implements ExceptionFilter {
    catch(exception: BoomException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response.status(status).json({
            statusCode: status,
            message: exception.message,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method
        });
    }
}
