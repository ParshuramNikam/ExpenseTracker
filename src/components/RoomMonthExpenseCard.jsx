import React, { useEffect, useState } from 'react'
import { db } from '../database/firebase.config';
import MonthArray from '../utils/MonthArray'
import firebase from 'firebase';

const RoomMonthExpenseCard = ({ filter, user, getAllTimeRoomRentDetails, roomId, month, rentDetailOfSingleMonth, roomRentDetails }) => {
    const [rentStatus, setRentStatus] = useState({})
    const [date, setDate] = useState(rentDetailOfSingleMonth.date);

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
        if (rentDetailOfSingleMonth) {
            setRentStatus(rentDetailOfSingleMonth.rent <= rentDetailOfSingleMonth.paid)
        }
    }, [rentDetailOfSingleMonth])

    return (
        <div className=" flex border-t-4 border-green-600 md:flex justify-between gap-3 m-2 rounded-md shadow-md bg-white text-gray-700 px-4 py-3">
            <div className="w-full">
                <div className="flex gap-x-2 gap-y-1 justify-between">
                    <h1 className={`w-fit px-5 py-2 border-2  ${rentStatus ? 'text-green-600  bg-green-100 border-green-600' : 'text-red-600  bg-red-100 border-red-600'} rounded-lg text-base font-semibold`}>
                        {rentStatus ? "Paid" : "Unpaid"}
                    </h1>
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
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="w-5 h-5 rounded-full cursor-pointer"
                                checked={rentStatus} value={rentStatus}
                                onChange={(e) => {
                                    setRentStatus(!rentStatus);

                                    if (e.currentTarget.checked) {
                                        setDate(new Date().toLocaleDateString().replaceAll('/', '-'))

                                        db.collection('RoomExpense').doc(roomId).update({
                                            [month]: {
                                                paid: rentDetailOfSingleMonth.rent,
                                                rent: rentDetailOfSingleMonth.rent,
                                                date: new Date().toLocaleDateString().replaceAll('/', '-')
                                            }
                                        })

                                        roomRentDetails[month].paid = rentDetailOfSingleMonth.rent;

                                    } else {
                                        setDate(null)
                                        db.collection('RoomExpense').doc(roomId).update({
                                            [month]: {
                                                paid: 0,
                                                rent: rentDetailOfSingleMonth.rent,
                                                date: null
                                            }
                                        })

                                        roomRentDetails[month].paid = 0;
                                    }

                                }}

                            />
                            <span className="ml-2">Mark {rentStatus ? "unpaid" : "paid"}</span>
                        </label>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="mt-2 text-sm font-medium text-gray-700">
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