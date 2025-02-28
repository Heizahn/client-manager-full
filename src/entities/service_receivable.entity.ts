import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { Profile } from './profile.entity';
import { Client } from './client.entity';
import { Payment } from './payment.entity';

@Entity('service_receivable')
export class ServiceReceivable {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'timestamptz' })
	created_at: Date;

	@Column({ type: 'text' })
	motivo: string;

	@Column({ type: 'int2' })
	monto: number;

	@Column({ type: 'int2' })
	deuda: number;

	@Column()
	estado: boolean;

	@ManyToOne(() => Client, (client) => client.service_receivable)
	client: Client;

	@ManyToOne(() => Profile, (profile) => profile.service_receivable)
	created_by: Profile;

	@ManyToMany(() => Payment, (payment) => payment.service_receivable)
	payments: Payment[];
}
