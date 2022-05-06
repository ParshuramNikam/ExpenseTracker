import React from "react";

const PersonalExpenseCard = () => {
  return (
    <div>
      <div className="flex border-t-4 border-red-500 md:flex justify-between gap-3 m-2 rounded-md shadow-md bg-white text-gray-700 px-4 py-3">
        <div>
          <div className="flex justify-between">
          <h1 className="w-min p-2 text-red-500  bg-red-100 rounded-lg text-base font-semibold">
            Management
          </h1>
          <div className=" mt-2 mr-2 text-gray-800 font-medium md:mt-0 text-3xl whitespace-nowrap text-right my-auto">
            &#8377; 5000
        </div>
          </div>
          <div className="font-semibold text-black">
            Lorem ipsum dolor sit amet! Lorem ipsum dolor sit amet consectetur
            adipi elit. Earum voluptatem porro perferendis.
          </div>
          <div className="mt-4 text-sm font-normal text-gray-700">
            {" "}
            <span className="whitespace-nowrap">02 May 2022</span> |{" "}
            <span className="whitespace-nowrap">04:40 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalExpenseCard;
