import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from './database.const';

export const databaseProviders = [
    {
        provide: SEQUELIZE,
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'platformprototypeuser',
                password: 'password',
                database: 'platform-prototype',
            });
            sequelize.addModels([]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
