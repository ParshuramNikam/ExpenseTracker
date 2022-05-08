import React, { useState } from 'react'
import { db } from '../database/firebase.config';
import MonthArray from '../utils/MonthArray'

const RoomMonthExpenseCard = ({ roomId, month, rentDetailOfSingleMonth }) => {
    const [rentStatus, setRentStatus] = useState(rentDetailOfSingleMonth.rent <= rentDetailOfSingleMonth.paid)
    const [date, setDate] = useState(rentDetailOfSingleMonth.date);

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
                    Month : <span className='capitalize'>{MonthArray[parseInt(month.toString().split('-')[0])-1]}</span> 
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
                                                paid: 8000,
                                                rent: 8000,
                                                date: new Date().toLocaleDateString().replaceAll('/', '-')
                                            }
                                        })

                                    } else {
                                        setDate(null)
                                        db.collection('RoomExpense').doc(roomId).update({
                                            [month]: {
                                                paid: 0,
                                                rent: 8000,
                                                date: null
                                            }
                                        })
                                    }
                                }}

                            />
                            <span className="ml-2">Mark {rentStatus ? "unpaid" : "paid"}</span>
                        </label>
                    </div>
                </div>
                <div className="mt-2 text-sm font-normal text-gray-700">
                    {" "}
                    <span className="whitespace-nowrap">{date ? date : "NA"}</span>
                </div>
            </div>
        </div>
    )
}

export default RoomMonthExpenseCard