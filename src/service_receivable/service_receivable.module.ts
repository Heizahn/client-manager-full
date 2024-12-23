import { Module } from '@nestjs/common';
import { ServiceReceivableService } from './service_receivable.service';
import { ServiceReceivableController } from './service_receivable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceReceivable } from '../entities/service_receivable.entity';
import { Client } from '../entities/client.entity';
import { Profile } from '../entities/profile.entity';
import { ClientsService } from 'src/clients/clients.service';

@Module({
	imports: [TypeOrmModule.forFeature([ServiceReceivable, Client, Profile])],
	controllers: [ServiceReceivableController],
	providers: [ServiceReceivableService, ClientsService],
})
export class ServiceReceivableModule {}
