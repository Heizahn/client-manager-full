import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from '../entities/service.entity';
import { Profile } from '../entities/profile.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Service, Profile])],
	controllers: [ServicesController],
	providers: [ServicesService],
})
export class ServicesModule {}
