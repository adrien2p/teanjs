import { Column } from 'typeorm';

export class SoftDeletableEntity {
    @Column({ type: 'timestamp', nullable: true })
    public deletedAt: Date | null = null;
}
