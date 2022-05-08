import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../database/firebase.config";

const RentExpenseCard = ({ index, data }) => {
  const [paymentStatus, setPaymentStatus] = useState("Paid");
  const [roomRentDetails, setRoomDetails] = useState();

  useEffect(() => {
    db.collection('RoomExpense').get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        console.log(doc.data());
      })
    })

  }, [])

  return (
    <Link key={index} to={'/rents/' + data.roomDetails.uuid}>
      <div className=" border-t-4 border-emerald-500 justify-between gap-3 m-2 rounded-md shadow-md bg-white text-gray-700 px-4 py-3">
        <div>
          <h1 className="mb-1 text-lg text-emerald-700 font-bold">Room: {data.roomDetails.name}</h1>
          <div className="flex items-center justify-between  gap-3 sm:gap-5  mb-2 ">
            <h1
              className={`w-min p-2 px-4 border-2 ${paymentStatus === "Unpaid"
                ? "text-red-500 border-red-500  bg-red-100"
                : "text-green-700 border-green-500  bg-green-100"
                } rounded-lg text-xs sm:text-base font-semibold`}
            >
              {paymentStatus}
            </h1>
            <div className="flex justify-start text-left mt-2 mr-2 text-gray-800 font-medium md:mt-0 text-2xl sm:text-3xl whitespace-nowrap sm:text-right my-auto">
              &#8377; {data.roomDetails.rentAmount}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RentExpenseCard;
