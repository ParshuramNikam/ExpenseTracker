import React from 'react'
import { db } from '../database/firebase.config';

const SiteDetails = ({ data, getAllSitesDetails }) => {

  const deleteDocFromDB = async () => {
    const ans = prompt("Are you sure! Do ypu want to delete - type 'yes'");
    if (ans.toLowerCase() === 'yes') {
      db.collection('BusinessExpense').doc(data.docId).delete()
        .then(() => {
          console.log("doc delete succesfully!");
          getAllSitesDetails();
        })
        .catch(err => {
          console.log(err.message);
        })
    } else {
      console.log("not deleted doc");
    }
  }

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
          <div className='flex justify-between items-center'>
            <div className="mt-4 text-sm font-normal text-gray-700">
              {" "}
              {data.details.timestamp}
            </div>
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

export default SiteDetails