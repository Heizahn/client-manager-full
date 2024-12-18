import { Module } from '@nestjs/common';
import { SectorsService } from './sectors.service';
import { SectorsController } from './sectors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sector } from 'src/entities/sector.entity';
import { Profile } from 'src/entities/profile.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Sector, Profile])],
	controllers: [SectorsController],
	providers: [SectorsService],
})
export class SectorsModule {}
