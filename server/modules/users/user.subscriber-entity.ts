import { EntitySubscriberInterface, InsertEvent, Connection, UpdateEvent, RemoveEvent, EventSubscriber } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { InjectConnection } from '@nestjs/typeorm';

@Injectable()
export class UserSubscriberEntity implements EntitySubscriberInterface<User> {
    constructor(
        @InjectConnection() private readonly connection: Connection,
        private readonly usersService: UsersService
    ) {
        connection.subscribers.push(this);
    }

    listenTo(): Function {
        return User;
    }

    public async beforeInsert(event: InsertEvent<User>): Promise<void> {
        const { hash: password, salt } = await this.usersService.hashPassword(event.entity.password);
        event.entity.password = password;
        event.entity.salt = salt;
    }
}
