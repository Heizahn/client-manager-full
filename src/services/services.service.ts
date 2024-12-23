import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
// import { UpdateServiceDto } from './dto/update-service.dto';
import { Repository } from 'typeorm';
import { Service } from '../entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class ServicesService {
	constructor(
		@InjectRepository(Service)
		private readonly serviceRepository: Repository<Service>,
		@InjectRepository(Profile)
		private readonly profileRepository: Repository<Profile>,
	) {}

	async create(createServiceDto: CreateServiceDto) {
		const profile = await this.profileRepository.findOne({
			where: { id: createServiceDto.created_by.id },
		});
		const service = this.serviceRepository.create({
			...createServiceDto,
			costo: Math.round(createServiceDto.costo * 100),
			created_at: new Date(),
			estado: true,
			created_by: profile,
		});
		await this.serviceRepository.save(service);
		return JSON.stringify({ message: 'Servicio creado exitosamente' });
	}

	async findAll() {
		return await this.serviceRepository.find({
			relations: ['created_by', 'clients'],
		});
	}

	async findOneByNewClient() {
		return this.serviceRepository.query(`SELECT id, nombre_service FROM services`);
	}

	findOne(id: number) {
		return `This action returns a #${id} service`;
	}
}
