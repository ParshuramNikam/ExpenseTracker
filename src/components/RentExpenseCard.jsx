import React, { useState } from "react";

const RentExpenseCard = () => {
    const [paymentStatus, setPaymentStatus] = useState("Paid");
    return (
        <div>
            <div className="sm:flex border-t-4 border-emerald-500 justify-between gap-3 m-2 rounded-md shadow-md bg-white text-gray-700 px-4 py-3">
                <div>
                    <div className="flex items-center  gap-3 sm:gap-5  mb-2 ">
                        <h1 className="mb-1 text-lg text-emerald-700 font-semibold">Room 1 :</h1>

                        <h1 className={`w-min p-2 px-4 border-2 ${paymentStatus === "Unpaid" ? "text-red-500 border-red-500  bg-red-100" : "text-green-700 border-green-500  bg-green-100"} rounded-lg text-xs sm:text-base font-semibold`}>
                            {paymentStatus}
                        </h1>
                    </div>

                    <h1 className="mb-1 text-emerald-600 font-bold font-serif">Current Month: May</h1>

                    {/* A tenant is someone who lives in a house or room and pays rent to the person who owns it. */}
                    <div className="font-semibold text-black">
                        <div className="font-medium">Tenant Name: <span className="font-normal">{'John Doe'}</span></div>
                        <div className="font-medium">Monthly Rent: <span className="font-normal">{5000} &#8377; </span></div>
                        <div className="font-medium">Rent Remaining: <span className="font-normal">{0} &#8377; </span></div>
                        <div className="font-medium">Rent Paid: <span className="font-normal">{5000} &#8377; </span></div>
                    </div>
                    <div className="mt-4 text-sm font-normal text-gray-700">
                        {"Last Payment : "}
                        <span className="whitespace-nowrap">02 May 2022</span> |{" "}
                        <span className="whitespace-nowrap">04:40 PM</span>
                    </div>
                    <button className={`mt-3 p-2 px-4 border-2 text-emerald-700 border-emerald-500  bg-emerald-100 hover:bg-emerald-200 rounded-lg mb-2 text-xs sm:text-base font-semibold`}>
                        Get All Rents Details
                    </button>
                </div>
                <div className=" mt-2 mr-2 text-gray-800 font-medium md:mt-0 text-3xl whitespace-nowrap text-right my-auto">
                    &#8377; 5000
                </div>
            </div>
        </div>
    );
};

export default RentExpenseCard;
