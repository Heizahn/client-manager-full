import * as yup from 'yup';

export const schemaValidate = yup.object({
	nombre: yup
		.string()
		.required('*')
		.min(3, 'Mínimo 3 caracteres')
		.max(15, 'Máximo 15 caracteres'),
	tipo: yup.string().required('*'),
	costo: yup.number().required('*').min(0, 'Mínimo 0 dolares').max(30, 'Máximo 30 dolares'),
});