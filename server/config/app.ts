import localAppConfig from './local/app';

export const appConfig = {
    port: process.env.EXPRESS_PORT || localAppConfig.port,
    isTest: process.env.NODE_ENV === 'test'
};
