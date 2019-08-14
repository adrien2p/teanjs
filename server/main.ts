import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);
    app.enableCors({
        methods: 'GET',
        maxAge: 3600,
    });
    await app.listen(3000);
}

bootstrap();
