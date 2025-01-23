import { Controller, Get, Post, Body } from '@nestjs/common';
import { SectorsService } from './sectors.service';
import { CreateSectorDto } from './dto/create-sector.dto';

@Controller('sectors')
export class SectorsController {
	constructor(private readonly sectorsService: SectorsService) {}

	@Post()
	create(@Body() createSectorDto: CreateSectorDto) {
		return this.sectorsService.create(createSectorDto);
	}

	@Get()
	findAll() {
		return this.sectorsService.findAll();
	}

	@Get('new-client')
	findCreateClient() {
		return this.sectorsService.findCreateClient();
	}
}
