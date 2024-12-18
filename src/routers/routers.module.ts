import { Module } from '@nestjs/common';
import { RoutersService } from './routers.service';
import { RoutersController } from './routers.controller';
import { Router } from 'src/entities/router.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profile.entity';
import { Sector } from 'src/entities/sector.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Router, Profile, Sector])],
	controllers: [RoutersController],
	providers: [RoutersService],
})
export class RoutersModule {}
