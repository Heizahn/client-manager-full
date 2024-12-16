import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Client } from './client.entity';
import { ServiceReceivable } from './service_receivable.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz' })
  created_at: Date;

  @Column({ type: 'text' })
  motivo: string;

  @Column({ type: 'numeric' })
  monto_ref: number;

  @Column({ type: 'numeric' })
  monto_bs: number;

  @Column({ type: 'text' })
  referencia: string;

  @Column()
  estado: boolean;

  @ManyToOne(() => Client, (client) => client.id)
  client: Client;

  @ManyToMany(() => ServiceReceivable, (serviceReceivable) => serviceReceivable.payment_id)
  @JoinTable() // Aquí se define la tabla intermedia
  service_receivable: Array<ServiceReceivable>;

  @ManyToOne(() => Profile, (profile) => profile.id)
  created_by: Profile;

  @ManyToOne(() => Profile, (profile) => profile.id)
  recibido_por: Profile;
}
