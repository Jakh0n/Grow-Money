import Link from 'next/link'

export default function Home() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6'>
			<div className='text-center'>
				<h1 className='text-4xl font-bold text-gray-800 mb-4'>
					Personal Finance & Investment Tracker
				</h1>
				<p className='text-gray-600 mb-8'>
					Manage your income, expenses, and start your gold investment journey.
				</p>
				<Link
					href='/income'
					className='inline-block bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700'
				>
					Start Planning
				</Link>
			</div>
		</div>
	)
}
