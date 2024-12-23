export default function SkeletonPay() {
	return (
		<div className='w-[420px] flex flex-col justify-center border-2 border-gray-400 bg-gray-800 rounded-lg px-4 pb-4'>
			{/* Cerrar */}
			<div className='flex flex-row items-center justify-end mt-2'>
				<div className='animate-pulse w-5 h-5 bg-gray-600 rounded-md'></div>
			</div>

			{/* Título y Cliente */}
			<div>
				<div className='animate-pulse h-8 bg-gray-600 rounded-md mx-auto w-1/2 mb-2'></div>
				<div className='animate-pulse h-5 bg-gray-600 rounded-md w-1/2 mb-2'></div>
				<div className='animate-pulse h-4 bg-gray-600 rounded-md w-3/4  mb-1'></div>
			</div>

			{/* Moneda */}
			<div className='flex flex-col gap-1 mt-3'>
				<div className='animate-pulse h-5 bg-gray-600 rounded-md w-1/4'></div>
				<div className='animate-pulse grid grid-cols-2 gap-6 mt-2'>
					<div className='animate-pulse h-8 bg-gray-600 rounded-md'></div>
					<div className='animate-pulse h-8 bg-gray-600 rounded-md'></div>
				</div>
			</div>

			{/* Tipo de Pago */}
			<div className='flex flex-col gap-1 mt-6'>
				<div className='animate-pulse h-5 bg-gray-600 rounded-md w-1/3'></div>
				<div className='animate-pulse grid grid-cols-2 gap-6 mt-2'>
					<div className='animate-pulse h-8 bg-gray-600 rounded-md'></div>
					<div className='animate-pulse h-8 bg-gray-600 rounded-md'></div>
				</div>
			</div>

			{/* Motivo */}
			<div className='mt-5'>
				<div className='animate-pulse h-5 bg-gray-600 rounded-md w-1/4'></div>
				<div className='animate-pulse h-8 bg-gray-600 rounded-md mt-2'></div>
			</div>

			{/* Recibido por */}
			<div className='mt-5'>
				<div className='animate-pulse h-5 bg-gray-600 rounded-md w-1/4'></div>
				<div className='animate-pulse h-8 bg-gray-600 rounded-md mt-2'></div>
			</div>

			{/* Monto */}
			<div className='grid grid-cols-2 gap-4 mt-5'>
				<div className='animate-pulse flex flex-col'>
					<div className='animate-pulse h-5 bg-gray-600 rounded-md w-1/2'></div>
					<div className='animate-pulse h-8 bg-gray-600 rounded-md mt-2'></div>
				</div>
				<div className='flex flex-col'>
					<div className='animate-pulse h-5 bg-gray-600 rounded-md w-1/2'></div>
					<div className='animate-pulse h-8 bg-gray-600 rounded-md mt-2'></div>
				</div>
			</div>

			{/* Referencia */}
			<div className=' mt-5'>
				<div className='animate-pulse h-5 bg-gray-600 rounded-md w-1/4'></div>
				<div className='animate-pulse h-8 bg-gray-600 rounded-md mt-2'></div>
			</div>

			{/* Botón Crear */}
			<div className='animate-pulse h-8 bg-gray-600 rounded-md mt-5 w-full'></div>
		</div>
	);
}
