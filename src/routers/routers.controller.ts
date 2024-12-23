import { Controller, Get, Post, Body } from '@nestjs/common';
import { RoutersService } from './routers.service';
import { CreateRouterDto } from './dto/create-router.dto';

@Controller('routers')
export class RoutersController {
	constructor(private readonly routersService: RoutersService) {}

	@Post()
	create(@Body() createRouterDto: CreateRouterDto) {
		return this.routersService.create(createRouterDto);
	}

	@Get()
	findAll() {
		return this.routersService.findAll();
	}

	@Get('new-client')
	findCreateClient() {
		return this.routersService.findCreateClient();
	}
}
