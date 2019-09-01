import { Connection, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { InjectConnection } from '@nestjs/typeorm';

@Injectable()
export class UserSubscriberEntity implements EntitySubscriberInterface<UserEntity> {
    constructor(@InjectConnection() connection: Connection, private readonly usersService: UsersService) {
        connection.subscribers.push(this);
    }

    listenTo(): Function {
        return UserEntity;
    }

    public async beforeInsert(event: InsertEvent<UserEntity>): Promise<void> {
        const { hash: password, salt } = await this.usersService.hashPassword(event.entity.password);
        event.entity.password = password;
        event.entity.salt = salt;
    }
}
