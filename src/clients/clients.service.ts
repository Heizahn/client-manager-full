import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { reactivateMK, suspendMK } from './mikrotik.connect';

@Injectable()
export class ClientsService {
	constructor(
		@InjectRepository(Client)
		private readonly clientRepository: Repository<Client>,
	) {}

	async create(createClientDto: CreateClientDto) {
		const client = this.clientRepository.create({
			...createClientDto,
			created_at: new Date(),
			saldo: 0,
			estado: true,
		});
		await this.clientRepository.save(client);
		return JSON.stringify({ message: 'Cliente creado exitosamente' });
	}

	async findAll(): Promise<Client[]> {
		try {
			return await this.clientRepository.query(
				`
          SELECT
            c."id",
            c."nombre",
            c."identificacion",
            c."direccion",
            c."telefono",
            s."nombre_sector",
            c."ipv4",
            p."nombre_service",
            c."saldo",
            c."estado"
          FROM "clients" c
          JOIN "sectors" s ON c."sectorId"= s."id"
          JOIN "services" p ON c."planId"= p."id"
		  ORDER BY c."nombre" ASC
        `,
			);
		} catch (error) {
			console.log(error);
		}
	}

	async findOne(id: string): Promise<Client> {
		return await this.clientRepository.findOne({
			where: {
				id,
			},
			relations: [
				'sector',
				'plan',
				'router',
				'created_by',
				'service_receivable',
				'payments',
				'payments.recibido_por',
				'payments.created_by',
			],
		});
	}

	async update(client: UpdateClientDto) {
		await this.clientRepository.update(client.id, client);
		return JSON.stringify({ message: 'Cliente actualizado exitosamente' });
	}

	async suspend(id: string, ip: string) {
		try {
			const res = await this.clientRepository.query(
				`SELECT nombre, ipv4 FROM clients WHERE id='${id}'`,
			);

			await suspendMK({
				clientIp: res[0].ipv4,
				clientUser: res[0].nombre,
				routerIp: ip,
			});

			await this.clientRepository.update(id, { estado: false });

			return JSON.stringify({ message: 'Cliente suspendido exitosamente' });
		} catch (error) {
			throw new Error(error);
		}
	}

	async reactivate(id: string, ip: string) {
		try {
			const res = await this.clientRepository.query(
				`SELECT nombre, ipv4 FROM clients WHERE id='${id}'`,
			);

			await reactivateMK({
				clientIp: res[0].ipv4,
				clientUser: res[0].nombre,
				routerIp: ip,
			});

			await this.clientRepository.update(id, { estado: true });

			return JSON.stringify({ message: 'Cliente reactivado exitosamente' });
		} catch (error) {
			throw new Error(error);
		}
	}

	async updateSaldo(id: string) {
		const resDebt = await this.clientRepository.query(
			`SELECT SUM(deuda) FROM service_receivable WHERE "clientId"='${id}' AND estado=true;`,
		);
		const debt = Number(resDebt[0].sum ? resDebt[0].sum : 0);

		const resCredit = await this.clientRepository.query(
			`SELECT SUM(saldo) FROM payments WHERE "clientId"='${id}' AND estado=true;`,
		);
		const credit = Number(resCredit[0].sum ? resCredit[0].sum : 0);

		await this.clientRepository.update(id, { saldo: debt + credit });
	}
}
