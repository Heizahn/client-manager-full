import { Payment } from '../../entities/payment.entity';

export type CreatePaymentDto = Omit<Payment, 'id' | 'created_at'> & {
	service_receivable_id: string;
	client_id: string;
	recibido_por: string;
	created_by: string;
};
