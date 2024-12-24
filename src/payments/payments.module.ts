import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../entities/payment.entity';
import { ClientsService } from 'src/clients/clients.service';
import { Client } from 'src/entities/client.entity';
import { Profile } from 'src/entities/profile.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Payment, Client, Profile])],
	controllers: [PaymentsController],
	providers: [PaymentsService, ClientsService],
})
export class PaymentsModule {}
