import * as yup from 'yup';

export const schemaValidate = yup.object({
	motivo: yup.string().required('*'),
	moneda: yup.string(),
	service_receivable_id: yup.string(),
	tipo: yup.string().required('*'),
	recibido_por: yup.string().required('*'),
	monto_ref: yup.number().required('*').min(0.01, 'Mínimo 0.01'),
	monto_bs: yup.number().required('*').min(0, 'Mínimo 0 dolares'),
	referencia: yup.string().required('*'),
});

export const InitialValues = {
	motivo: 'Abono',
	tipo: 'Efectivo',
	moneda: 'REF',
	recibido_por: '',
	monto_ref: 0,
	monto_bs: 0,
	referencia: '',
	service_receivable_id: '',
};
