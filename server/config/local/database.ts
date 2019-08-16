const databaseConfig = {
    host: 'localhost',
    port: 5432,
    username: 'platformprototypeuser',
    password: 'password',
    database: 'platformprototype',
    logging: false,
    synchronize: false
};

if (process.env.NODE_ENV === 'testing') {
    databaseConfig.database = 'platformprototypetest';
    databaseConfig.synchronize = true;
}

export default databaseConfig;
