import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
// import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { ClientsService } from 'src/clients/clients.service';
import { Client } from 'src/entities/client.entity';
import { Profile } from 'src/entities/profile.entity';

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
			const resInvoice = await this.paymentRepository.query(
				`SELECT deuda FROM service_receivable WHERE id = '${createPaymentDto.service_receivable_id}'`,
			);

			const debt = Number(resInvoice[0].deuda);

			const newDebt = debt + Math.round(createPaymentDto.monto_ref * 100);

			if (newDebt <= 0) {
				await this.paymentRepository.query(
					`UPDATE service_receivable SET deuda = '${newDebt}' WHERE id = '${createPaymentDto.service_receivable_id}'`,
				);
			} else {
				credit = newDebt;
				await this.paymentRepository.query(
					`UPDATE service_receivable SET deuda = 0 WHERE id = '${createPaymentDto.service_receivable_id}'`,
				);
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

		await this.paymentRepository.save(payment);
		await this.clientsService.updateSaldo(createPaymentDto.client_id);
		return { message: 'Pago registrado exitosamente' };
	}
}
