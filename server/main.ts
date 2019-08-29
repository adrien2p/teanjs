import * as cookieParser from 'cookie-parser';
import { appConfig } from './environments/app';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { BadRequestExceptionFilter } from './common/filters/badRequest-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);

    app.useGlobalFilters(new BadRequestExceptionFilter());
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

                return new BadRequestException([].concat(...messages).join(' - '));
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

bootstrap();
