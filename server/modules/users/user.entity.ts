import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { SoftDeletableEntity } from '../../common/typeorm/entities/SoftDeletableEntity';

@Entity('users')
@Unique(['email'])
export class UserEntity extends SoftDeletableEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    public email: string;

    @Column({ nullable: false, select: false })
    public password: string;

    @Column({ nullable: false, select: false })
    public salt: string;

    @Column({ nullable: true })
    public emailValidatedAt: Date;

    @Column({ type: 'varchar', length: 50, nullable: true })
    public role: string;

    @Column({ type: 'jsonb', default: [], nullable: false })
    public flags: string[];

    @CreateDateColumn({ type: 'timestamp with time zone', nullable: false })
    public createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true })
    public updatedAt: Date;
}
