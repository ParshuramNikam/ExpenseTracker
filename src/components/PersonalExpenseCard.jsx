import React from "react";

const PersonalExpenseCard = ({ data, index }) => {
  return (
    <div key={index} className="min-h-full">
      <div className="flex  min-h-full border-t-4 border-red-500 md:flex justify-between gap-3 m-2 rounded-md shadow-md bg-white text-gray-700 px-4 py-3">
        <div className="w-full h-full">
          <div className="flex justify-between">
            <h1 className="w-min p-2 text-red-500  bg-red-100 rounded-lg text-base font-semibold">
              {data.expenseDetails.title}
            </h1>
            <div className=" mt-2 mr-2 text-gray-800 font-medium md:mt-0 text-3xl whitespace-nowrap text-right my-auto">
              &#8377; {data.expenseDetails.expenseAmount}
            </div>
          </div>
          <div className="font-semibold text-black break-words">
            {data.expenseDetails.desc}
          </div>
          <div className="mt-4 text-sm font-normal text-gray-700">
            {" "}
            {/* <span className="whitespace-nowrap">{data.expenseDetails.title}</span> |{" "}
            <span className="whitespace-nowrap">{data.expenseDetails.title}</span> */}
            {data.expenseDetails.date} | {data.expenseDetails.time}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalExpenseCard;
