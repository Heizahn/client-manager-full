import { Injectable } from '@nestjs/common';
import { CreateServiceReceivableDto } from './dto/create-service_receivable.dto';
// import { UpdateServiceReceivableDto } from './dto/update-service_receivable.dto';
import { MoreThan, Repository } from 'typeorm';
import { ServiceReceivable } from '../entities/service_receivable.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/entities/client.entity';
import { Profile } from 'src/entities/profile.entity';
import { ClientsService } from 'src/clients/clients.service';
import { Payment } from 'src/entities/payment.entity';

@Injectable()
export class ServiceReceivableService {
	constructor(
		@InjectRepository(ServiceReceivable)
		private readonly serviceReceivableRepository: Repository<ServiceReceivable>,
		@InjectRepository(Client)
		private readonly clientRepository: Repository<Client>,
		@InjectRepository(Profile)
		private readonly profileRepository: Repository<Profile>,
		private readonly clientsService: ClientsService,
		@InjectRepository(Payment)
		private readonly paymentRepository: Repository<Payment>,
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

		const payment = await this.paymentRepository.find({
			where: {
				saldo: MoreThan(0),
			},
			order: {
				created_at: 'ASC',
			},
		});

		let debit = Number(-monto);

		if (payment.length > 0) {
			for (const pay of payment) {
				debit += Number(pay.saldo);
				if (debit <= 0) {
					pay.saldo = 0;
					await this.paymentRepository.save(pay);
				} else {
					pay.saldo = debit;
					debit = 0;
					await this.paymentRepository.save(pay);
				}
			}
		}

		const serviceReceivable = this.serviceReceivableRepository.create({
			motivo: createServiceReceivableDto.motivo,
			monto,
			deuda: debit,
			created_at: new Date(),
			created_by: profile,
			estado: true,
			client: client,
		});
		await this.serviceReceivableRepository.save(serviceReceivable);

		await this.clientsService.updateSaldo(clientId);

		return JSON.stringify({ message: 'Deuda creada exitosamente' });
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
