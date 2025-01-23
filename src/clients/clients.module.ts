import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '../entities/client.entity';
import { ServiceReceivable } from 'src/entities/service_receivable.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Client, ServiceReceivable])],
	controllers: [ClientsController],
	providers: [ClientsService],
})
export class ClientsModule {}
