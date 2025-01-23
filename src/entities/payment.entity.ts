import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { Profile } from './profile.entity';
import { Client } from './client.entity';
import { ServiceReceivable } from './service_receivable.entity';

@Entity('payments')
export class Payment {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'timestamptz' })
	created_at: Date;

	@Column({ type: 'text' })
	motivo: string;

	@Column({ type: 'numeric' })
	monto_ref: number;

	@Column({ type: 'numeric' })
	monto_bs: number;

	@Column({ type: 'numeric' })
	saldo: number;

	@Column({ type: 'text' })
	referencia: string;

	@Column({ type: 'text' })
	tipo: string;

	@Column()
	estado: boolean;

	@ManyToOne(() => Client, (client) => client.payments)
	client: Client;

	@ManyToMany(() => ServiceReceivable, (serviceReceivable) => serviceReceivable.payments)
	service_receivable: Array<ServiceReceivable>;

	@ManyToOne(() => Profile, (profile) => profile.payments)
	created_by: Profile;

	@ManyToOne(() => Profile, (profile) => profile.payments)
	recibido_por: Profile;
}
