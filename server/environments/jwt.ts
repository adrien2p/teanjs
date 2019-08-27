import localJwtConfig from './local/jwt';

const jwtConfig = {
    secret: process.env.JWT_SECRET_OR_KEY || localJwtConfig.secretOrKey,
    signOptions: process.env.JWT_SIGN_OPTIONS ? JSON.parse(process.env.JWT_SIGN_OPTIONS) : localJwtConfig.signOptions
};

export default jwtConfig;
