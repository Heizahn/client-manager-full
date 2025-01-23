import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
// import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { ClientsService } from 'src/clients/clients.service';
import { Client } from 'src/entities/client.entity';
import { Profile } from 'src/entities/profile.entity';
import { ServiceReceivable } from 'src/entities/service_receivable.entity';

@Injectable()
export class PaymentsService {
	constructor(
		@InjectRepository(Payment)
		private paymentRepository: Repository<Payment>,
		@InjectRepository(Client)
		private clientRepository: Repository<Client>,
		@InjectRepository(Profile)
		private profileRepository: Repository<Profile>,
		private clientsService: ClientsService,
		@InjectRepository(ServiceReceivable)
		private serviceReceivableRepository: Repository<ServiceReceivable>,
	) {}

	async create(createPaymentDto: CreatePaymentDto) {
		const client = await this.clientRepository.findOne({
			where: { id: createPaymentDto.client_id },
		});
		const profile = await this.profileRepository.findOne({
			where: { id: createPaymentDto.created_by },
		});

		const receivedBy = await this.profileRepository.findOne({
			where: { id: createPaymentDto.recibido_por },
		});

		let credit = 0;

		if (createPaymentDto.service_receivable_id) {
			const resInvoice = await this.serviceReceivableRepository.findOne({
				where: { id: createPaymentDto.service_receivable_id },
			});

			const debt = Number(resInvoice.deuda);

			const newDebt = debt + Math.round(createPaymentDto.monto_ref * 100);

			if (newDebt <= 0) {
				await this.serviceReceivableRepository.update(
					{ id: createPaymentDto.service_receivable_id },
					{ deuda: newDebt },
				);
			} else {
				credit = newDebt;
				await this.serviceReceivableRepository.update(
					{ id: createPaymentDto.service_receivable_id },
					{ deuda: 0 },
				);
				const servicesReceivable = await this.serviceReceivableRepository.find({
					where: { client, deuda: LessThan(0) },
				});

				if (servicesReceivable.length > 0) {
					for (const service of servicesReceivable) {
						credit += service.deuda;

						if (credit <= 0) {
							await this.serviceReceivableRepository.update(
								{ id: service.id },
								{ deuda: credit },
							);
						} else {
							await this.serviceReceivableRepository.update(
								{ id: service.id },
								{ deuda: 0 },
							);
						}
					}
				}
			}
		} else {
			credit = Math.round(createPaymentDto.monto_ref * 100);
		}

		const payment = this.paymentRepository.create({
			...createPaymentDto,
			recibido_por: receivedBy,
			client: client,
			created_at: new Date(),
			monto_ref: Math.round(createPaymentDto.monto_ref * 100),
			monto_bs: Math.round(createPaymentDto.monto_bs * 100),
			estado: true,
			saldo: credit,
			created_by: profile,
		});

		// console.log(payment);
		await this.paymentRepository.save(payment);
		await this.clientsService.updateSaldo(createPaymentDto.client_id);
		return { message: 'Pago registrado exitosamente' };
	}

	async sendMessage(id: string) {
		const payment = await this.paymentRepository.findOne({
			where: { client: { id } },
			relations: { client: true, service_receivable: true },
			order: { created_at: 'DESC' },
		});

		const data = {
			client: payment.client.nombre,
			monto_ref: payment.monto_ref,
			monto_bs: payment.monto_bs,
			motivo: payment.motivo,
			referencia: payment.referencia,
			service_receivable: payment.service_receivable,
		};

		console.log(data);
	}
}
