import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { SoftDeletableEntity } from '../../common/typeorm/entities/SoftDeletableEntity';

@Entity('users')
@Unique(['email'])
export class User extends SoftDeletableEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: false })
    public email: string;

    @Column({ nullable: false, select: false })
    public password: string;

    @Column({ nullable: false, select: false })
    public salt: string;

    @Column({ nullable: true })
    public emailValidatedAt: Date;

    @Column({ default: 'customer' })
    public role: string;

    @Column({ type: 'jsonb', default: [] })
    public flags: string[];

    @CreateDateColumn({ type: 'timestamp with time zone', nullable: false })
    public createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    public updatedAt: Date;
}
