import * as Boom from '@hapi/boom';
import * as cookieParser from 'cookie-parser';
import { appConfig } from './environments/app';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { BoomExceptionFilter } from './common/filters/boom-exception.filter';
import { BoomException } from './common/exceptions/BoomException';

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);

    app.useGlobalFilters(new BoomExceptionFilter());
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            exceptionFactory: errors => {
                const messages = Object.keys(errors[0].constraints).map(key => {
                    return `The ${errors[0].constraints[key]}`;
                });

                return new BoomException(Boom.badRequest([].concat(...messages).join(' - ')));
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
