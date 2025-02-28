import { Controller, Get, Post, Body } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
// import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
export class ServicesController {
	constructor(private readonly servicesService: ServicesService) {}

	@Post()
	create(@Body() createServiceDto: CreateServiceDto) {
		return this.servicesService.create(createServiceDto);
	}

	@Get()
	findAll() {
		return this.servicesService.findAll();
	}
	@Get('new-client')
	findOneByClient() {
		return this.servicesService.findOneByNewClient();
	}
}
