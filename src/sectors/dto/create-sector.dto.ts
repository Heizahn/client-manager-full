import { Sector } from 'src/entities/sector.entity';

export type CreateSectorDto = Omit<Sector, 'id'>;
