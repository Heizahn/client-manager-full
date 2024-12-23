import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sector } from './sector.entity';
import { Router } from './router.entity';
import { ServiceReceivable } from './service_receivable.entity';
import { Client } from './client.entity';
import { Payment } from './payment.entity';
import { Service } from './service.entity';

@Entity('profiles')
export class Profile {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'text' })
	nombre: string;

	@OneToMany(() => Sector, (sector) => sector.created_by)
	sectors: Sector[];

	@OneToMany(() => Router, (router) => router.created_by)
	routers: Router[];

	@OneToMany(() => Client, (client) => client.created_by)
	clients: Client[];

	@OneToMany(() => Payment, (payment) => payment.created_by)
	payments: Payment[];

	@OneToMany(() => Service, (service) => service.created_by)
	services: Service[];

	@OneToMany(() => ServiceReceivable, (serviceReceivable) => serviceReceivable.created_by)
	service_receivable: ServiceReceivable[];
}
