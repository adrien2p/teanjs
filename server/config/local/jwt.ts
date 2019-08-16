import { JwtModuleOptions } from '@nestjs/jwt';

const localJwtConfig = {
    secretOrKey: 'jwtSecret',
    signOptions: { expiresIn: '60s' }
};

export default localJwtConfig;
