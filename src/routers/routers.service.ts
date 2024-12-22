import { Injectable } from '@nestjs/common';
import { CreateRouterDto } from './dto/create-router.dto';
import { UpdateRouterDto } from './dto/update-router.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Router } from '../entities/router.entity';
import { Profile } from 'src/entities/profile.entity';
import { Sector } from 'src/entities/sector.entity';

@Injectable()
export class RoutersService {
	constructor(
		@InjectRepository(Router)
		private readonly routerRepository: Repository<Router>,
		@InjectRepository(Profile)
		private readonly profileRepository: Repository<Profile>,
		@InjectRepository(Sector)
		private readonly sectorRepository: Repository<Sector>,
	) {}

	async create(createRouterDto: CreateRouterDto) {
		const profile = await this.profileRepository.findOne({
			where: { id: createRouterDto.created_by.id },
		});

		const sector = await this.sectorRepository.findOne({
			where: { id: createRouterDto.sector_id.id },
		});

		const router = this.routerRepository.create({
			...createRouterDto,
			created_by: profile,
			sector_id: sector,
			estado: true,
			created_at: new Date(),
		});

		return await this.routerRepository.save(router);
	}

	findAll() {
		return this.routerRepository.find({
			relations: ['created_by', 'clients', 'sector_id'],
		});
	}

	async findCreateClient() {
		return await this.routerRepository.query(
			`SELECT id, nombre
      FROM routers`,
		);
	}
	findOne(id: number) {
		return `This action returns a #${id} router`;
	}

	update(id: number, updateRouterDto: UpdateRouterDto) {
		return `This action updates a #${id} router`;
	}

	remove(id: number) {
		return `This action removes a #${id} router`;
	}
}
