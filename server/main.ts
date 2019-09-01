import * as cookieParser from 'cookie-parser';
import { appConfig } from './environments/app';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { BadRequestException, ValidationPipe, Logger } from '@nestjs/common';
import { BadRequestExceptionFilter } from './common/filters/badRequestException.filter';
import { EntityNotFoundExceptionFilter } from './common/filters/entityNotFoundException.filter';

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);

    app.useGlobalFilters(new BadRequestExceptionFilter(), new EntityNotFoundExceptionFilter());
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            exceptionFactory: errors => {
                const messages = errors.map(error => {
                    return Object.keys(error.constraints).map(key => {
                        return `The ${error.constraints[key]}`;
                    });
                });

                return new BadRequestException([].concat(...(messages as any)).join(' - '));
            }
        })
    );

    app.enableCors({
        methods: 'GET',
        maxAge: 3600
    });

    app.use(cookieParser());

    await app.listen(appConfig.port);
}

bootstrap().then(() => true);
