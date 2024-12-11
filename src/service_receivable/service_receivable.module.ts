import { Module } from '@nestjs/common';
import { ServiceReceivableService } from './service_receivable.service';
import { ServiceReceivableController } from './service_receivable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceReceivable } from '../entities/service_receivable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceReceivable])],
  controllers: [ServiceReceivableController],
  providers: [ServiceReceivableService],
})
export class ServiceReceivableModule {}
