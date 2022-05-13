import React from 'react'

const SiteDetails = ({ data }) => {
  return (
    <div>
      <div className="flex border-t-4 border-purple-500 md:flex justify-between gap-3 m-2 rounded-md shadow-md bg-white text-gray-700 px-4 py-3">
        <div className='w-full'>
          <div className="flex justify-between">
            <h1 className=" p-2 text-purple-500  bg-purple-100 rounded-lg text-base font-semibold">
              {data.details.title}
            </h1>
            <div className=" mt-2 mr-2 text-gray-800 font-medium md:mt-0 text-3xl whitespace-nowrap text-right my-auto">
              &#8377; {data.details.expenseAmount}
            </div>
          </div>
          <div className="font-semibold text-black">
            {data.details.desc}
          </div>
          <div className="mt-4 text-sm font-normal text-gray-700">
            {" "}
            {data.details.timestamp}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SiteDetails