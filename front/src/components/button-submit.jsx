export default function ButtonSubmit({
	loading,
	children,
	className,
}) {
	return (
		<button
			type='submit'
			disabled={loading}
			className={`mt-2 w-full py-1 bg-blue-700 flex flex-row items-center justify-center rounded-md text-white hover:bg-blue-800 transition-all duration-150 ease-linear ${
				loading
					? 'opacity-50 cursor-not-allowed bg-blue-950 hover:bg-blue-950'
					: className
			}`}
		>
			{children}
		</button>
	);
}