import { Link, useNavigate } from 'react-router-dom';
import { formatMoney } from '../../../hooks/format-money';
import LinkGoogleMaps from '../../../hooks/link-google-maps';
import PropTypes from 'prop-types';
import { useState } from 'react';
import NewPay from '../../Forms/payments/new-pay';
import ShowForm from '../../show-form';
import PaidIcon from '@mui/icons-material/Paid';

export default function ClientRow({ client }) {
	const navigate = useNavigate();

	const handleClick = () => {
		return navigate(`/client/${client.id}`);
	};
	const [show, setShow] = useState(false);
	return (
		<>
			<tr className='border-t border-gray-400 hover:cursor-pointer hover:bg-gray-700 transition-all duration-300 ease-linear'>
				<td onClick={handleClick} className='text-left py-1 pl-4'>
					{client.nombre}
				</td>
				<td onClick={handleClick}>{client.identificacion}</td>
				<td onClick={handleClick}>{client.telefono}</td>
				<td>
					<LinkGoogleMaps direccion={client.direccion}>
						{client.nombre_sector}
					</LinkGoogleMaps>
				</td>
				<td className='cursor-default'>
					<Link
						to={`http://${client.ipv4}`}
						target='_blank'
						className='text-blue-400 hover:underline hover:underline-offset-4'
					>
						{client.ipv4}
					</Link>
				</td>
				<td>{client.dia_corte}</td>
				<td onClick={handleClick}>{client.nombre_service}</td>
				<td
					onClick={handleClick}
					className={`text-right pr-4 ${
						client.saldo < 0 ? 'text-red-500' : 'text-green-500'
					}`}
				>
					{formatMoney(client.saldo)}
				</td>
				<td
					onClick={handleClick}
					className={`${
						!client.estado
							? 'text-red-500'
							: client.saldo < 0
								? 'text-orange-500'
								: 'text-green-500'
					}`}
				>
					{!client.estado ? 'Suspendido' : 'Activo'}
				</td>
				<td className='cursor-default'>
					<ShowForm title={<PaidIcon />} show={show} setShow={setShow}>
						<NewPay clientId={client.id} setShow={setShow} />
					</ShowForm>
				</td>
			</tr>
		</>
	);
}

ClientRow.propTypes = {
	client: PropTypes.shape({
		id: PropTypes.string.isRequired,
		nombre: PropTypes.string.isRequired,
		identificacion: PropTypes.string.isRequired,
		telefono: PropTypes.string.isRequired,
		direccion: PropTypes.string.isRequired,
		dia_corte: PropTypes.string.isRequired,
		ipv4: PropTypes.string.isRequired,
		nombre_sector: PropTypes.string.isRequired,
		nombre_service: PropTypes.string.isRequired,
		saldo: PropTypes.number.isRequired,
		estado: PropTypes.bool.isRequired,
	}).isRequired,
};
