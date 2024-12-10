import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Profile } from './profile.entity';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz' })
  created_at: Date;

  @Column({ type: 'text' })
  nombre_service: string;

  @Column({ type: 'text' })
  tipo: string;

  @Column({ type: 'int2' })
  clientes: number;

  @Column({ type: 'int2' })
  costo: number;

  @Column()
  estado: boolean;

  @ManyToOne(() => Profile, (profile) => profile.id)
  created_by: Profile;
}
