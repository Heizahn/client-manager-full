import * as yup from 'yup';

export const schemaRouter = yup.object({
	nombre: yup
		.string()
		.required('*')
		.min(3, 'Mínimo 3 caracteres')
		.max(15, 'Máximo 15 caracteres'),
	sector: yup.string().required('*'),
	part1: yup
		.string()
		.required('*')
		.min(1, '*')
		.max(3, '*')
		.matches(/^([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-4])$/, '*'),

	part2: yup
		.string()
		.required('*')
		.min(1, '*')
		.max(3, '*')
		.matches(/^([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-4])$/, '*'),

	part3: yup
		.string()
		.required('*')
		.min(1, '*')
		.max(3, '*')
		.matches(/^([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-4])$/, '*'),

	part4: yup
		.string()
		.required('*')
		.min(1, '*')
		.max(3, '*')
		// matches de números del 0 al 254
		.matches(/^([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-4])$/, '*'),
});
