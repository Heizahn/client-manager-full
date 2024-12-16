import { Client } from 'src/entities/client.entity';

export type CreateClientDto = Omit<Client, 'id'| "created_at">;
