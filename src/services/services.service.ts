import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Repository } from 'typeorm';
import { Service } from '../entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ServicesService {
	constructor(
		@InjectRepository(Service)
		private readonly serviceRepository: Repository<Service>,
	) {}

	async create(createServiceDto: CreateServiceDto) {
		const service = this.serviceRepository.create({
			...createServiceDto,
			costo: Math.round(createServiceDto.costo * 100),
			created_at: new Date(),
			estado: true,
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

	update(id: number, updateServiceDto: UpdateServiceDto) {
		return `This action updates a #${id} service`;
	}
}
