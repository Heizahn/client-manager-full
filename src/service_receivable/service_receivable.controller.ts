import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ServiceReceivableService } from './service_receivable.service';
import { CreateServiceReceivableDto } from './dto/create-service_receivable.dto';
// import { UpdateServiceReceivableDto } from './dto/update-service_receivable.dto';

@Controller('service_receivable')
export class ServiceReceivableController {
	constructor(private readonly serviceReceivableService: ServiceReceivableService) {}

	@Post(':id')
	create(
		@Param('id') id: string,
		@Body() createServiceReceivableDto: CreateServiceReceivableDto,
	) {
		return this.serviceReceivableService.create(id, createServiceReceivableDto);
	}

	@Get()
	findAll(@Body() { id }: { id: string }) {
		return this.serviceReceivableService.findAll(id);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.serviceReceivableService.findOne(+id);
	}
}
