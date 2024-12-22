import { Controller, Get, Post, Body, Patch, Param, Put, Res } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from 'src/entities/client.entity';
import { Response } from 'express';

@Controller('clients')
export class ClientsController {
	constructor(private readonly clientsService: ClientsService) {}

	@Post()
	create(@Body() createClientDto: CreateClientDto) {
		return this.clientsService.create(createClientDto);
	}

	@Get()
	async findAll(): Promise<Client[]> {
		return this.clientsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.clientsService.findOne(id);
	}

	@Patch('update/:id')
	update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
		return this.clientsService.update({ ...updateClientDto, id });
	}

	@Put('suspend/:id')
	async suspend(
		@Param('id') id: string,
		@Body() router: { ip: string },
		@Res() res: Response,
	) {
		try {
			await this.clientsService.suspend(id, router.ip);
			res.status(200).json({ message: 'Cliente suspendido exitosamente' });
		} catch (error) {
			res.status(500).json({ error });
		}
	}

	@Put('reactivate/:id')
	async reactivate(
		@Param('id') id: string,
		@Body() router: { ip: string },
		@Res() res: Response,
	) {
		try {
			await this.clientsService.reactivate(id, router.ip);
			res.status(200).json({ message: 'Cliente reactivado exitosamente' });
		} catch (error) {
			res.status(500).json({ error });
		}
	}
}
