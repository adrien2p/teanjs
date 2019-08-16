import localDatabaseConfig from './local/database';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const databaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST || localDatabaseConfig.host,
    port: Number(process.env.DATABASE_PORT || localDatabaseConfig.port),
    username: process.env.DATABASE_USERNAME || localDatabaseConfig.username,
    password: process.env.DATABASE_PASSWORD || localDatabaseConfig.password,
    database: process.env.DATABASE_DBNAME || localDatabaseConfig.database,
    synchronize: localDatabaseConfig.synchronize,
    migrationsTableName: 'migrations',
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    migrations: [__dirname + '/../migrations/*.{ts,js}'],
    cli: {
        migrationsDir: __dirname + '/server/migrations'
    }
};

export = databaseConfig;
