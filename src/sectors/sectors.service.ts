import { Injectable } from '@nestjs/common';
import { CreateSectorDto } from './dto/create-sector.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sector } from 'src/entities/sector.entity';
import { Profile } from 'src/entities/profile.entity';

@Injectable()
export class SectorsService {
	constructor(
		@InjectRepository(Sector)
		private readonly sectorRepository: Repository<Sector>,
		@InjectRepository(Profile)
		private readonly profileRepository: Repository<Profile>,
	) {}

	async create(createSectorDto: CreateSectorDto) {
		const profile = await this.profileRepository.findOne({
			where: {
				id: createSectorDto.created_by.id,
			},
		});

		const sector = this.sectorRepository.create({
			nombre_sector: createSectorDto.nombre_sector,
			created_at: new Date(),
			created_by: profile,
			estado: true,
		});
		return await this.sectorRepository.save(sector);
	}

	findAll() {
		return this.sectorRepository.find({
			relations: ['created_by', 'clients'],
		});
	}

	async findCreateClient() {
		return await this.sectorRepository.query(
			`SELECT id, nombre_sector
      FROM sectors`,
		);
	}
}
