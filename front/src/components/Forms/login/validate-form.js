import * as Yup from 'yup';
export const validationSchema = Yup.object().shape({
	email: Yup.string().email('Correo inválido').required('*'),
	password: Yup.string().required('*'),
});
