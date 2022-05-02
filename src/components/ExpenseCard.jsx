import React from 'react'

const ExpenseCard = () => {
  return (
    <div className='shadow-md bg-white p-2 m-2 border-2 rounded-lg border-gray-800 text-gray-800'>
        <h1 className='text-xl font-bold mb-2'>Title</h1>
        <h3 className='text-lg'>5000 &#8377; - <span className='text-red-500 font-medium'>Pending/Done</span> </h3>
    </div>
  )
}

export default ExpenseCard