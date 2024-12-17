import { Service } from 'src/entities/service.entity';

export type CreateServiceDto = Omit<Service, 'id'>;
