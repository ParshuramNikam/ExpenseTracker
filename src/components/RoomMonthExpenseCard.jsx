import React, { useEffect, useState } from 'react'
import { db } from '../database/firebase.config';
import MonthArray from '../utils/MonthArray'
import firebase from 'firebase';

const RoomMonthExpenseCard = ({ filter, user, getAllTimeRoomRentDetails, roomId, month, rentDetailOfSingleMonth, roomRentDetails }) => {
    const [rentStatus, setRentStatus] = useState(true)
    const [date, setDate] = useState(rentDetailOfSingleMonth.date);
    const [paidValue, setPaidValue] = useState(null);

    const deleteDocFromDB = async () => {
        const ans = prompt("Are you sure! Do ypu want to delete - type 'yes'");
        if (ans.toLowerCase() === 'yes') {
            db.collection('RoomExpense').doc(roomId).set({
                [month]: firebase.firestore.FieldValue.delete()
            }, { merge: true })
                .then(() => {
                    console.log("doc delete succesfully!");
                    getAllTimeRoomRentDetails();
                })
                .catch(err => {
                    console.log(err.message);
                })
        } else {
            console.log("not deleted doc");
        }
    }

    useEffect(() => {
        // if (rentDetailOfSingleMonth) {
        //     setRentStatus(rentDetailOfSingleMonth.rent <= rentDetailOfSingleMonth.paid)
        // }
    }, [rentDetailOfSingleMonth])

    return (
        <div className=" flex border-t-4 border-green-600 md:flex justify-between gap-3 m-2 rounded-md shadow-md bg-white text-gray-700 px-4 py-3">
            <div className="w-full">
                <div className="flex flex-wrap-reverse gap-x-2 gap-y-2 justify-between">
                    <div className=''>
                        <h1 className={`w-fit px-5 py-2 border-2 mb-1.5  ${rentStatus ? 'text-green-600  bg-green-100 border-green-600' : 'text-red-600  bg-red-100 border-red-600'} rounded-lg text-base font-semibold`}>
                            {
                                // rentStatus
                                // ? 
                                "Paid : " + rentDetailOfSingleMonth.paid
                                // : "Unpaid : " + (rentDetailOfSingleMonth.rent - rentDetailOfSingleMonth.paid)
                            }
                        </h1>
                        <h1 className={`w-fit px-5 py-2 border-2 text-red-600  bg-red-100 border-red-600 rounded-lg text-base font-semibold`}>
                            {
                                // rentStatus
                                // ? 
                                "Unpaid : " + (parseInt(rentDetailOfSingleMonth.rent) - parseInt(rentDetailOfSingleMonth.paid))
                                // : "Unpaid : " + (rentDetailOfSingleMonth.rent - rentDetailOfSingleMonth.paid)
                            }
                        </h1>
                    </div>
                    <div className=" mt-2 mr-2 text-gray-800 font-medium md:mt-0 text-3xl whitespace-nowrap text-right my-auto">
                        &#8377; {rentDetailOfSingleMonth.rent}
                    </div>
                </div>
                <div className="mt-2 text-emerald-700 font-semibold">
                    Month : <span className='capitalize'>{MonthArray[parseInt(month.toString().split('-')[0]) - 1]}</span> &nbsp; | &nbsp;
                    Year : <span className='capitalize'>{month.split('-')[1]}</span>
                </div>
                <div className="block">
                    <div className="mt-2">
                        <input type="number" name="paid_amount" id="paid_amount"
                            className='mr-1 mb-1.5 border-2 border-gray-800 p-1 rounded-md' placeholder='Paid amount'
                            value={paidValue} onChange={(e) => setPaidValue(e.target.value)}
                        />
                        {/* <br /> */}
                        <label className="inline-flex items-center cursor-pointer">
                            <button className='bg-gray-700 shadow  border-2 border-gray-700 text-white px-3 p-1 rounded-md'
                                onClick={() => {
                                    if (paidValue) {
                                        // setRentStatus(!rentStatus);

                                        // if (e.currentTarget.checked) {
                                        setDate(new Date().toLocaleDateString().replaceAll('/', '-'))

                                        db.collection('RoomExpense').doc(roomId).update({
                                            [month]: {
                                                paid: parseInt(rentDetailOfSingleMonth.paid) + parseInt(paidValue),
                                                rent: rentDetailOfSingleMonth.rent,
                                                date: new Date().toLocaleDateString().replaceAll('/', '-')
                                            }
                                        }).then(() => {
                                            setPaidValue(0);
                                        })

                                        roomRentDetails[month].paid = parseInt(rentDetailOfSingleMonth.paid) + parseInt(paidValue);


                                        // } else {
                                        //     setDate(null)
                                        //     db.collection('RoomExpense').doc(roomId).update({
                                        //         [month]: {
                                        //             paid: 0,
                                        //             rent: rentDetailOfSingleMonth.rent,
                                        //             date: null
                                        //         }
                                        //     })

                                        //     roomRentDetails[month].paid = 0;
                                        // }
                                    } else {
                                        alert("Enter paid amount")
                                    }
                                }}
                            >
                                Update
                            </button>
                        </label>
                    </div>
                </div>
                <div className="mt-3  flex flex-wrap justify-between items-center">
                    <div className="text-sm font-medium text-gray-700">
                        {" "}
                        <span className="whitespace-nowrap">Paid on : {date ? date : "NA"}</span>
                    </div>
                    <div>
                        <button className="float-right flex justify-center items-center gap-1.5 w-max bg-red-500 text-white rounded-md mt-1.5 px-4 py-2"
                            onClick={deleteDocFromDB}
                        >
                            <div>
                                Delete
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomMonthExpenseCard