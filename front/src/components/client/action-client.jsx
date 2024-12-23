import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFetchPut as FetchPut } from '../../hooks/useFetch';
import PropTypes from 'prop-types';

export default function ActionClient({ id, children, action, router }) {
	const clientQuery = useQueryClient();
	const mutation = useMutation({
		mutationFn: () => FetchPut(`/api/clients/${action}/${id}`, { ip: router }),
		onSuccess: () => {
			toast.success(
				`Cliente ${action === 'suspend' ? 'suspendido' : 'reactivado'} exitosamente`,
			);
			clientQuery.invalidateQueries(['client', id]);
			clientQuery.refetchQueries(['clients', 'sectors', 'services', 'routers']);
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	const handleClick = () => {
		mutation.mutate();
	};

	return (
		<button onClick={handleClick} className='hover:underline hover:underline-offset-4'>
			{children}
		</button>
	);
}

ActionClient.propTypes = {
	id: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	action: PropTypes.string.isRequired,
	router: PropTypes.string.isRequired,
};
