import { appConfig } from './environments/app';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true
        })
    );

    app.enableCors({
        methods: 'GET',
        maxAge: 3600
    });

    await app.listen(appConfig.port);
}

bootstrap();
