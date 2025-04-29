'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function IncomePage() {
	const [income, setIncome] = useState<number>(0)
	const router = useRouter()

	const handleNext = () => {
		// Save income to LocalStorage
		localStorage.setItem('income', JSON.stringify(income))
		router.push('/expenses')
	}

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-white p-6'>
			<h2 className='text-3xl font-semibold text-gray-800 mb-6'>
				Enter Your Monthly Income
			</h2>
			<div className='w-full max-w-md'>
				<Input
					type='number'
					placeholder='e.g., 2763880'
					value={income}
					onChange={e => setIncome(Number(e.target.value))}
					className='mb-4'
				/>
				<Button onClick={handleNext} className='w-full'>
					Next: Enter Expenses
				</Button>
			</div>
		</div>
	)
}
