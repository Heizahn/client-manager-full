import * as yup from 'yup';

export const schemaValidate = yup.object({
	motivo: yup
		.string()
		.required('*')
		.min(3, 'Mínimo 3 caracteres')
		.max(50, 'Máximo 50 caracteres'),
	monto: yup.number().required('*').min(0.01, 'Mínimo 0.01 dolares'),
});

export const InitialValues = {
	motivo: '',
	monto: 0,
};
