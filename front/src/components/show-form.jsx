import { PropTypes } from 'prop-types';

ShowForm.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	show: PropTypes.bool.isRequired,
	setShow: PropTypes.func.isRequired,
};

export default function ShowForm({ title, children, show, setShow }) {
	return (
		<>
			<button
				onClick={() => setShow(!show)}
				className={`bg-blue-600 text-white ${typeof title === 'string' ? 'px-4' : 'px-1'} py-0.5 rounded-md hover:bg-blue-700 transition-all duration-300 ease-linear`}
			>
				{title}
			</button>
			{show && children}
		</>
	);
}
