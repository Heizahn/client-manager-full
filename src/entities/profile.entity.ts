import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sector } from './sector.entity';
import { Router } from './router.entity';
import { ServiceReceivable } from './service_receivable.entity';

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

	@OneToMany(() => ServiceReceivable, (serviceReceivable) => serviceReceivable.created_by)
	service_receivable: ServiceReceivable[];
}
