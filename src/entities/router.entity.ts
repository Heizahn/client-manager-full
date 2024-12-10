import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Sector } from './sector.entity';
import { Profile } from './profile.entity';

@Entity('routers')
export class Router {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz' })
  created_at: Date;

  @Column({ type: 'text' })
  nombre: string;

  @Column({ type: 'text' })
  ip: string;

  @Column()
  estado: boolean;

  @Column({ type: 'int2' })
  clientes: number;

  @ManyToOne(() => Profile, (profile) => profile.id)
  created_by: Profile;

  @ManyToOne(() => Sector, (sector) => sector.id)
  sector_id: Sector;
}
