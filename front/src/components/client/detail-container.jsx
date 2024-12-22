export default function DetailContainer({ title, children }) {
	return (
		<div className=''>
			<h4 className='text-xl font-bold'>{title}</h4>
			<div className='flex flex-col gap-1'>{children}</div>
		</div>
	);
}
