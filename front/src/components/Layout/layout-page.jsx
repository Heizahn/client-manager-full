export default function LayoutPage({ children, title }) {
	return (
		<>
			<div className='flex flex-row justify-center items-center py-2 rounded-md bg-gray-800'>
				<h2 className='text-center text-2xl font-bold'>{title}</h2>
			</div>
			{children}
		</>
	);
}
