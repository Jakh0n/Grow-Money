'use client'

import { Button } from '@/components/ui/button'
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js'
import { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
Chart.register(ArcElement, Tooltip, Legend)

export default function ResultsPage() {
	const [income, setIncome] = useState(0)
	const [expenses, setExpenses] = useState({
		rent: 0,
		phone: 0,
		insurance: 0,
		family: 0,
	})
	const [leftover, setLeftover] = useState(0)

	useEffect(() => {
		const storedIncome = localStorage.getItem('income')
		const storedExpenses = localStorage.getItem('expenses')

		if (!storedIncome || !storedExpenses) {
			alert('No data found. Please input your income and expenses first.')
			window.location.href = '/' // Redirect to Home
			return
		}

		const parsedIncome = JSON.parse(storedIncome)
		const parsedExpenses = JSON.parse(storedExpenses)

		setIncome(parsedIncome)
		setExpenses(parsedExpenses)

		const totalExpenses =
			parsedExpenses.rent +
			parsedExpenses.phone +
			parsedExpenses.insurance +
			parsedExpenses.family
		setLeftover(parsedIncome - totalExpenses)
	}, [])

	const totalExpenses =
		expenses.rent + expenses.phone + expenses.insurance + expenses.family

	// Investment calculation (adjust percentages as needed)
	const savingPercent = 0.5 // 50% Emergency Savings
	const investmentPercent = 0.3 // 30% User Investment (stocks, gold, anything)
	const funPercent = 0.2 // 20% Fun/Lifestyle

	const savingAmount = leftover * savingPercent
	const investmentAmount = leftover * investmentPercent
	const funAmount = leftover * funPercent

	return (
		<div className='grid grid-cols-2 min-h-screen  bg-gray-50 p-6'>
			{/* Result Cards */}
			<div className='bg-white shadow-md rounded-xl p-6 w-full max-w-md space-y-4'>
				<h2 className='text-3xl font-semibold text-gray-800 mb-6'>
					Your Financial Summary
				</h2>
				<div>
					<p className='text-gray-500'>Monthly Income:</p>
					<p className='text-xl font-bold'>{income.toLocaleString()} won</p>
				</div>

				<div>
					<p className='text-gray-500'>Total Expenses:</p>
					<p className='text-xl font-bold'>
						{totalExpenses.toLocaleString()} won
					</p>
				</div>

				<div>
					<p className='text-gray-500'>Leftover:</p>
					<p className='text-xl font-bold text-green-600'>
						{leftover.toLocaleString()} won
					</p>
				</div>

				{/* Investment Advice */}
				<div className='mt-4'>
					<p className='text-gray-700 font-semibold'>
						Recommended Saving (50%):
					</p>
					<p className='text-blue-600'>{savingAmount.toLocaleString()} won</p>

					<p className='text-gray-700 font-semibold mt-2'>
						Flexible Investment (30%):
					</p>
					<p className='text-green-600'>
						{investmentAmount.toLocaleString()} won
					</p>

					<p className='text-gray-700 font-semibold mt-2'>
						Fun/Lifestyle Budget (20%):
					</p>
					<p className='text-purple-600'>{funAmount.toLocaleString()} won</p>
				</div>
			</div>

			{/* Pie Chart */}
			<div className='w-full max-w-md mt-8'>
				<Pie
					data={{
						labels: ['Expenses', 'Leftover'],
						datasets: [
							{
								label: 'Money Distribution',
								data: [totalExpenses, leftover],
								backgroundColor: ['#f87171', '#4ade80'],
								hoverOffset: 4,
							},
						],
					}}
				/>
			</div>

			{/* Reset and Edit Buttons */}
			<div className='flex flex-col gap-4 mt-6 w-full max-w-md'>
				<Button
					onClick={() => (window.location.href = '/income')}
					className='w-full'
				>
					Edit Income
				</Button>
				<Button
					onClick={() => (window.location.href = '/expenses')}
					className='w-full'
				>
					Edit Expenses
				</Button>
				<Button
					onClick={() => {
						if (confirm('Are you sure you want to reset all data?')) {
							localStorage.removeItem('income')
							localStorage.removeItem('expenses')
							window.location.href = '/' // Redirect to Home
						}
					}}
					variant='destructive'
					className='mt-6 w-full'
				>
					Reset and Start Over
				</Button>
			</div>
		</div>
	)
}
