import { Injectable } from '@nestjs/common';
import { CreateServiceReceivableDto } from './dto/create-service_receivable.dto';
// import { UpdateServiceReceivableDto } from './dto/update-service_receivable.dto';
import { Repository } from 'typeorm';
import { ServiceReceivable } from '../entities/service_receivable.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ServiceReceivableService {
	constructor(
		@InjectRepository(ServiceReceivable)
		private readonly serviceReceivableRepository: Repository<ServiceReceivable>,
	) {}
	async create(clientId: string, createServiceReceivableDto: CreateServiceReceivableDto) {
		const serviceReceivable = this.serviceReceivableRepository.create({
			...createServiceReceivableDto,
			created_at: new Date(),
			estado: true,
			client: {
				id: clientId,
			},
		});
		return this.serviceReceivableRepository.save(serviceReceivable);
	}

	async findAll(id: string) {
		try {
			return await this.serviceReceivableRepository.find({
				relations: ['created_by'],
				where: {
					client: {
						id: id,
					},
				},
			});
		} catch (err) {
			throw new Error(err.message);
		}
	}

	findOne(id: number) {
		return `This action returns a #${id} serviceReceivable`;
	}
}
