import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Router } from './router.entity';
import { Sector } from './sector.entity';
import { Service } from './service.entity';
import { Profile } from './profile.entity';
import { ServiceReceivable } from './service_receivable.entity';
import { Payment } from './payment.entity';

@Entity('clients')
export class Client {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'timestamptz' })
	created_at: Date;

	@Column({ type: 'text' })
	nombre: string;

	@Column({ type: 'text' })
	identificacion: string;

	@Column({ type: 'text' })
	direccion: string;

	@Column({ type: 'text' })
	ipv4: string;

	@Column({ type: 'text' })
	telefono: string;

	@Column({ type: 'numeric' })
	saldo: number;

	@Column({ type: 'int2' })
	dia_corte: number;

	@Column()
	estado: boolean;

	@ManyToOne(() => Router, (router) => router.clients)
	router: Router;

	@ManyToOne(() => Sector, (sector) => sector.clients)
	sector: Sector;

	@ManyToOne(() => Service, (service) => service.clients)
	plan: Service;

	@ManyToOne(() => Profile, (profile) => profile.clients)
	created_by: Profile;

	@OneToMany(() => ServiceReceivable, (serviceReceivable) => serviceReceivable.client)
	service_receivable: ServiceReceivable[];

	@OneToMany(() => Payment, (payment) => payment.client)
	payments: Payment[];
}
