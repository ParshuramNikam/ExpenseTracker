import React, { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../database/firebase.config";

const BussinessExpenseCard = ({ fetchDataFromDB, user, data, index }) => {
  const [paymentStatus, setPaymentStatus] = useState("Paid");

  const deleteDocFromDB = async () => {
    const ans = prompt("Are you sure! Do ypu want to delete - type 'yes'");
    if (ans.toLowerCase() === 'yes') {
      db.collection('BusinessDetails').doc(data.expenseId).delete()
        .then(() => {
          db.collection('BusinessExpense').where("siteId", '==', data.businessDetails.uuid)
            .get()
            .then((snapshot) => {
              snapshot.docs.forEach(async doc => {
                await db.collection('BusinessExpense')
                  .doc(doc.id).delete()
                  .then(() => console.log(doc.id + " deleted sucesfully!"))
                  .catch(err => {
                    console.log("error whilte deteing doc" + doc.id + " in BusinessExpense collection");
                    console.log(err.message);
                  })
              })
            })
        })
        .then(() => {
          console.log("doc delete succesfully!");
          fetchDataFromDB();
        })
        .catch(err => {
          console.log("error whilte deteing docs in BusinessExpense collection");
          console.log(err.message);
        })
    } else {
      console.log("not deleted doc");
    }
  }

  return (
    <div className=" border-t-4 border-purple-500 justify-between gap-3 m-2 rounded-md shadow-md bg-white text-gray-700 px-4 py-3">
      <div>
        <Link to={'/sites/' + data.businessDetails.uuid} key={index}>
          <h1 className="mb-1 text-lg text-purple-500 font-bold">Site : <span className="text-black font-semibold" >{data.businessDetails.name}</span></h1>
          <h1 className="mb-1 text-lg text-purple-500 font-bold">Location : <span className="text-black font-semibold">{data.businessDetails.location}</span></h1>
        </Link>
        <div className="h-12">
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
  );
};

export default BussinessExpenseCard;
