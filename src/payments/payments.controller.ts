import { Controller, Post, Body, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentsController {
	constructor(private readonly paymentsService: PaymentsService) {}

	@Post()
	create(@Body() createPaymentDto: CreatePaymentDto) {
		return this.paymentsService.create(createPaymentDto);
	}

	@Post('send-message/:id')
	sendMessage(@Param('id') id: string) {
		return this.paymentsService.sendMessage(id);
	}
}
