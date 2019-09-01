import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '../../environments/jwt';
import { AuthController } from './auth.controller';

@Module({
    imports: [UserModule, PassportModule.register({ defaultStrategy: 'jwt' }), JwtModule.register(jwtConfig)],
    providers: [AuthService, JwtStrategy, LocalStrategy],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
