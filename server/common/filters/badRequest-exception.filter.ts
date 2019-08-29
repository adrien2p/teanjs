import { Catch, ExceptionFilter, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const data = exception.getResponse();
        console.log(data);
        response.status(status).json({
            statusCode: status,
            message: (data as any).message,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method
        });
    }
}
