import { Module } from '@nestjs/common';
import { AngularUniversalModule, applyDomino } from '@nestjs/ng-universal';
import { join } from 'path';
import { DatabaseModule } from './modules/database/database.module';

const BROWSER_DIR = join(process.cwd(), 'dist/browser');
applyDomino(global, join(BROWSER_DIR, 'index.html'));

@Module({
    imports: [
        AngularUniversalModule.forRoot({
            viewsPath: BROWSER_DIR,
            bundle: require('./../server/main'),
            liveReload: true,
        }),
        DatabaseModule
    ],
    providers: [],
    controllers: []
})
export class ApplicationModule {
}
