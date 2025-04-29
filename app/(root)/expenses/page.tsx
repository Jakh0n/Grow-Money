'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ExpensesPage() {
	const [rent, setRent] = useState(0)
	const [phone, setPhone] = useState(0)
	const [insurance, setInsurance] = useState(0)
	const [family, setFamily] = useState(0)
	const router = useRouter()

	const handleNext = () => {
		// Save expenses to LocalStorage
		const expenses = { rent, phone, insurance, family }
		localStorage.setItem('expenses', JSON.stringify(expenses))
		router.push('/results')
	}

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-white p-6'>
			<h2 className='text-3xl font-semibold text-gray-800 mb-6'>
				Enter Your Monthly Expenses
			</h2>
			<div className='w-full max-w-md space-y-4'>
				<Input
					placeholder='Home Rent'
					type='number'
					value={rent}
					onChange={e => setRent(Number(e.target.value))}
				/>
				<Input
					placeholder='Phone Bill'
					type='number'
					value={phone}
					onChange={e => setPhone(Number(e.target.value))}
				/>
				<Input
					placeholder='Insurance'
					type='number'
					value={insurance}
					onChange={e => setInsurance(Number(e.target.value))}
				/>
				<Input
					placeholder='Family Support'
					type='number'
					value={family}
					onChange={e => setFamily(Number(e.target.value))}
				/>
				<Button onClick={handleNext} className='w-full'>
					View Results
				</Button>
			</div>
		</div>
	)
}
