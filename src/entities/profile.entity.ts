import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sector } from './sector.entity';

@Entity('profiles')
export class Profile {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'text' })
	nombre: string;

	@OneToMany(() => Sector, (sector) => sector.created_by)
	sectors: Sector[];
}
