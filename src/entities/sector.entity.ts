import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Profile } from './profile.entity';
import { Client } from './client.entity';
import { Router } from './router.entity';

@Entity('sectors')
export class Sector {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'timestamptz' })
	created_at: Date;

	@Column({ type: 'text' })
	nombre_sector: string;

	@OneToMany(() => Client, (client) => client.sector)
	clients: Client[];

	@Column()
	estado: boolean;

	@ManyToOne(() => Profile, (profile) => profile.sectors)
	created_by: Profile;

	@OneToMany(() => Router, (router) => router.sector_id)
	routers: Router[];
}
