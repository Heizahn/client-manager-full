import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Profile } from './profile.entity';
import { Client } from './client.entity';

@Entity('sectors')
export class Sector {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'timestamptz' })
	created_at: Date;

	@Column({ type: 'text' })
	nombre_sector: string;

	@OneToMany(() => Client, (client) => client.plan)
	clients: Client[];

	@Column()
	estado: boolean;

	@ManyToOne(() => Profile, (profile) => profile.id)
	created_by: Profile;
}
