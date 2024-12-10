import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Profile } from './profile.entity';

@Entity('sectors')
export class Sector {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz' })
  created_at: Date;

  @Column({ type: 'text' })
  nombre_sector: string;

  @Column({ type: 'int2' })
  clientes: number;

  @Column()
  estado: boolean;

  @ManyToOne(() => Profile, (profile) => profile.id)
  created_by: Profile;
}
