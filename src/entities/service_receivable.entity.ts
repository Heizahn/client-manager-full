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
	nombre: string;

	@Column({ type: 'text' })
	motivo: string;

	@Column({ type: 'int2' })
	monto: number;

	@Column({ type: 'int2' })
	deuda: number;

	@Column()
	estado: boolean;

	@ManyToOne(() => Client, (client) => client.id)
	client: Client;

	@ManyToOne(() => Profile, (profile) => profile.id)
	created_by: Profile;

	@ManyToMany(() => Payment, (payment) => payment.service_receivable)
	payment_id: Array<Payment>; // Manteniendo el nombre original
}
