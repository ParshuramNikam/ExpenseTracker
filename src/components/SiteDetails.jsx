import React from 'react'

const SiteDetails = () => {
  return (
    <div>
    <div className="flex border-t-4 border-purple-500 md:flex justify-between gap-3 m-2 rounded-md shadow-md bg-white text-gray-700 px-4 py-3">
      <div>
        <div className="flex justify-between">
        <h1 className=" p-2 text-purple-500  bg-purple-100 rounded-lg text-base font-semibold">
          Labor Cost
        </h1>
        <div className=" mt-2 mr-2 text-gray-800 font-medium md:mt-0 text-3xl whitespace-nowrap text-right my-auto">
          &#8377; 7000
      </div>
        </div>
        <div className="font-semibold text-black">
          Lorem ipsum dolor sit amet! Lorem ipsum dolor sit amet consectetur
          adipi elit. Earum voluptatem porro perferendis. Lorem ipsum dolor sit.
        </div>
        <div className="mt-4 text-sm font-normal text-gray-700">
          {" "}
          <span className="whitespace-nowrap">01 March 2012</span> |{" "}
          <span className="whitespace-nowrap">01:50 AM</span>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SiteDetails