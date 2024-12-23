import { ServiceReceivable } from 'src/entities/service_receivable.entity';

export type CreateServiceReceivableDto = Omit<ServiceReceivable, 'id' | 'created_at'>;
