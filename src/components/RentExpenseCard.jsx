import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../database/firebase.config";

const RentExpenseCard = ({ fetchDataFromDB, index, data }) => {
  const [paymentStatus, setPaymentStatus] = useState("Paid");
  const [roomRentDetails, setRoomDetails] = useState();

  const deleteDocFromDB = async () => {
    const ans = prompt("Are you sure! Do ypu want to delete - type 'yes'");
    if (ans.toLowerCase() === 'yes') {

      db.collection('RoomsDetails').doc(data.expenseId).delete()
        .then(() => {
          console.log("room details" + data.expenseId + "delete succesfully!");

          db.collection('RoomExpense').doc(data.roomDetails.uuid).delete()
            .then(() => {
              console.log("room expenses" + data.roomDetails.uuid + "delete succesfully!");
            }).catch((err) => {
              console.log("error occured while deleteing room expenses");
              console.log(err.message);
            })
        }).then(() => {
          fetchDataFromDB();
        })
        .catch(err => {
          console.log("error occured while deleteing room details");
          console.log(err.message);
        })


    } else {
      console.log("not deleted doc");
    }
  }

  useEffect(() => {
    db.collection('RoomExpense').get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        console.log(doc.data());
      })
    })

  }, [])

  return (
    <div className=" border-t-4 border-emerald-500 justify-between gap-3 m-2 rounded-md shadow-md bg-white text-gray-700 px-4 py-3">
      <div>
        <Link key={index} to={'/rents/' + data.roomDetails.uuid}>
          <h1 className="mb-1 text-lg text-emerald-700 font-bold ">&#8594; Room: {data.roomDetails.name}</h1>
        </Link >
        <div className="flex flex-col">
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
          <div>
            <button className="float-right flex justify-center items-center gap-1.5 w-max bg-red-500 text-white rounded-md mt-1.5 px-4 py-2"
              onClick={deleteDocFromDB}
            >
              <div>
                Delete
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}  >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
            </button>
          </div>
        </div>


      </div>
    </div >
  );
};

export default RentExpenseCard;
