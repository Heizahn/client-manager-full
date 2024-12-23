import { Injectable } from '@nestjs/common';
import { CreateServiceReceivableDto } from './dto/create-service_receivable.dto';
// import { UpdateServiceReceivableDto } from './dto/update-service_receivable.dto';
import { Repository } from 'typeorm';
import { ServiceReceivable } from '../entities/service_receivable.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/entities/client.entity';
import { Profile } from 'src/entities/profile.entity';

@Injectable()
export class ServiceReceivableService {
	constructor(
		@InjectRepository(ServiceReceivable)
		private readonly serviceReceivableRepository: Repository<ServiceReceivable>,
		@InjectRepository(Client)
		private readonly clientRepository: Repository<Client>,
		@InjectRepository(Profile)
		private readonly profileRepository: Repository<Profile>,
	) {}
	async create(clientId: string, createServiceReceivableDto: CreateServiceReceivableDto) {
		const client = await this.clientRepository.findOne({
			where: {
				id: clientId,
			},
		});
		const profile = await this.profileRepository.findOne({
			where: {
				id: createServiceReceivableDto.created_by.id,
			},
		});

		const monto = Math.round(createServiceReceivableDto.monto * 100);
		const serviceReceivable = this.serviceReceivableRepository.create({
			motivo: createServiceReceivableDto.motivo,
			monto,
			deuda: -monto,
			created_at: new Date(),
			created_by: profile,
			estado: true,
			client: client,
		});

		await this.clientRepository.update(client.id, {
			saldo: client.saldo + -monto,
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
