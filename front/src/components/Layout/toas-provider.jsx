import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastProvider({ children }) {
	return (
		<>
			{children}
			<ToastContainer autoClose={2000} closeButton={true} theme='dark' />
		</>
	);
}
