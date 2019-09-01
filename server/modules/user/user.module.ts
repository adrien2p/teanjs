import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSubscriberEntity } from './user.subscriber-entity';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from './user.repository';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        TypeOrmModule.forFeature([UserEntity, UserRepository])
    ],
    providers: [UserService, UserSubscriberEntity],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}
