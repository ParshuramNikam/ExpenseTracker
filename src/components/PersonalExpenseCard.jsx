import React from 'react'

const PersonalExpenseCard = () => {
    return (
        <div>
            <div className='md:flex justify-between gap-3 m-2 rounded-md shadow-md bg-red-500 text-white px-4 py-3'>
                <div>
                    <div className=''>Lorem ipsum dolor sit amet! Lorem ipsum dolor sit amet consectetur adipi elit. Earum voluptatem porro perferendis, corporis obcaecati at sequi sapiente nesciunt mollitia quae.</div>
                    <div className='mt-4 text-sm'> <span className='whitespace-nowrap'>02 May 2022</span> | <span className='whitespace-nowrap'>04:40 PM</span></div>
                </div>
                <div className='mt-3 md:mt-0 text-2xl whitespace-nowrap text-right my-auto'>5000 &#8377;</div>
            </div>
        </div>
    )
}

export default PersonalExpenseCard