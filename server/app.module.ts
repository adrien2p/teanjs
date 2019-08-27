import { join } from 'path';
import { Module } from '@nestjs/common';
import { AngularUniversalModule, applyDomino } from '@nestjs/ng-universal';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as databaseConfig from './environments/database';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/authentication/auth.module';

const BROWSER_DIR = join(process.cwd(), 'dist/browser');
applyDomino(global, join(BROWSER_DIR, 'index.html'));

@Module({
    imports: [
        AngularUniversalModule.forRoot({
            viewsPath: BROWSER_DIR,
            bundle: require('../server/main.js'),
            liveReload: true
        }),
        TypeOrmModule.forRoot(databaseConfig),
        UsersModule,
        AuthModule
    ],
    providers: [],
    controllers: []
})
export class ApplicationModule {}
