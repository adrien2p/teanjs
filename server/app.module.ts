import { join } from 'path';
import { Module } from '@nestjs/common';
import { AngularUniversalModule, applyDomino } from '@nestjs/ng-universal';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as databaseConfig from './environments/database';
import { UserModule } from './modules/user/user.module';
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
        UserModule,
        AuthModule
    ],
    providers: [],
    controllers: []
})
export class ApplicationModule {}
