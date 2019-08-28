import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSubscriberEntity } from './user.subscriber-entity';
import { UsersController } from './users.controller';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from './user.repository';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        TypeOrmModule.forFeature([UserEntity, UserRepository])
    ],
    providers: [UsersService, UserSubscriberEntity],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule {}
