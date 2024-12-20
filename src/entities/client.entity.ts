import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Router } from './router.entity';
import { Sector } from './sector.entity';
import { Service } from './service.entity';
import { Profile } from './profile.entity';

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

	@Column({ type: 'int2' })
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

	@ManyToOne(() => Profile, (profile) => profile.id)
	created_by: Profile;
}
