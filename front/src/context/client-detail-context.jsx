import { useState } from 'react';
import PropTypes from 'prop-types';
import { ClientDetailContext } from './ClientDetailContext';

export const ClientDetailProvider = ({ children }) => {
	const [active, setActive] = useState('details');
	const [triggerSubmit, setTriggerSubmit] = useState(null);

	return (
		<ClientDetailContext.Provider
			value={{ active, setActive, triggerSubmit, setTriggerSubmit }}
		>
			{children}
		</ClientDetailContext.Provider>
	);
};

ClientDetailProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
