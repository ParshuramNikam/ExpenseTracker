import React, { useEffect, useState } from "react";
import ExpenseCard from "../components/ExpenseCard";
import PersonalExpenseCard from "../components/PersonalExpenseCard";
import { db } from "../database/firebase.config";
import firebase from "firebase";

const PersonalExpenses = ({ user }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [inProcess, setInProcess] = useState(false);

  const [fetchData, setFetchData] = useState(true);
  const [loading, setLoading] = useState(true);

  const [expenseData, setExpenseData] = useState([]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  function onCloseModal() {
    setIsOpen(false);
  }

  useEffect(() => {

    db.collection('PersonalExpense').where("addedBy", "==", user.uid).get().then(snapshot => {
      setLoading(true);
      setExpenseData([])
      snapshot.docs.forEach(doc => {
        console.log(">>>>", doc.data());
        setExpenseData((prevArr) => [
          ...prevArr,
          { expenseId: doc.id, expenseDetails: doc.data() },
        ]);
      })
    }).then(() => { console.log("success"); setLoading(false); })
      .catch((err) => { console.log(err.message); setLoading(false); })

  }, [fetchData])


  function onOpenModal() {
    setIsOpen(true);
  }

  const addPersonalExpenseInDB = () => {
    setInProcess(true);
    db.collection('PersonalExpense').doc().set({
      addedBy: user.uid,
      title: title,
      desc: desc,
      expenseAmount: parseInt(amount),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      timestamp: `${date} | ${time}`
    })
      .then(() => {
        console.log("Document successfully added to personal expense!");
        setTime(""); setDate(""); setAmount(""); setTitle(""); setDesc("");
        setIsOpen(false);
        alert("Personal expense added succesfully!")
        setTimeout(() => {
          setInProcess(false);
        }, 1000);
      })
      .catch((error) => {
        setInProcess(false);
        console.error("Error writing document: ", error);
      });
  }

  return (
    <>
      <div className="bg-gray-200 min-h-screen">
        <h1 className="text-2xl md:text-3xl text-black  pt-3 ml-3 mb-0 font-bold">
          Personal Expenses
        </h1>
        <div className="m-2 mb-0 md:flex justify-between">
          <div className="flex md:w-max items-center gap-1.5 my-4">
            <p className="text-black font-normal text-xl ml-2">Welcome back,</p>
            <h3 className="whitespace-nowrap text-red-500 font-semibold  text-xl">
              Jhon Doe
            </h3>
          </div>

          {!isOpen && (
            <div className="mt-2 ">
              <button
                className='shadow-lg md:w-auto mx-auto md:mx-0 flex justify-center items-center gap-1 bg-red-500 hover:bg-gray-600 transition duration-50 delay-100 hover:delay-100" text-white px-4 py-4 md:py-2 rounded-lg'
                onClick={onOpenModal}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 mr-2 "
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-base md:text-lg ">Add New Expense</p>
              </button>
            </div>
          )}
        </div>

        {/*  show hide to add new expense */}
        <div className="flex justify-center mb-5 ">
          <div
            className={`${!isOpen && "hidden "
              } max-w-xl  transition delay-150 duration-300 ease-in-out  mb-4 mx-2`}
          >
            <form className=" bg-gray-100 rounded mt-1 p-2">
              <h3 className="text-center text-xl text-black font-semibold">
                ADD NEW EXPENSE
              </h3>
              <input
                type="text"
                name="expense"
                id="expense"
                placeholder="Enter Expense"
                value={title} onChange={(e) => setTitle(e.target.value)}
                className="mt-4 w-full border-2 rounded-3xl p-1 pl-4 outline-none placeholder-black  border-gray-400"
              />
              <textarea
                type="text"
                rows="3"
                name="expense_details"
                id="expense_details"
                placeholder="Enter Expense Details"
                value={desc} onChange={(e) => setDesc(e.target.value)}
                className="mt-2 w-full border-2  rounded-3xl p-1 pl-4 outline-none border-gray-400 placeholder-black"
              ></textarea>

              <input
                type="number"
                name="expense_amount"
                id="expense_amount"
                placeholder="Expense Amount"
                value={amount} onChange={(e) => setAmount(e.target.value)}
                className="mt-2 w-full border-2 rounded-3xl placeholder-black p-1 pl-4 outline-none border-gray-400"
              />

              <input
                type="date"
                value={date} onChange={(e) => setDate(e.target.value)}

                className="mt-2 w-full  border-2 rounded-3xl p-1 pl-4 outline-none border-gray-400"
              />

              <input
                type="time"
                value={time} onChange={(e) => setTime(e.target.value)}
                className="mt-2 w-full  border-2 rounded-3xl p-1 pl-4 outline-none border-gray-400"
              />

              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={addPersonalExpenseInDB}
                  disabled={inProcess}
                  className={`${inProcess ? "cursor-not-allowed hover:bg-indigo-400 bg-indigo-400" : "hover:bg-indigo-800 bg-indigo-600"} mx-auto text-center  mt-3 w-full rounded-3xl  font-semibold text-lg py-2 px-3.5 flex items-center justify-center flex-nowrap  text-white justify-center"`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  ADD&nbsp;
                </button>

                <button
                  type="button"
                  onClick={onCloseModal}
                  className="mx-auto mt-3 rounded-3xl w-full hover:bg-red-600 bg-red-500 font-semibold text-lg py-2 px-3.5 flex items-center flex-nowrap  text-white justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  CLOSE&nbsp;
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-2 w-max mx-auto mb-5 flex items-center gap-3 bg-gray-50 m-2 rounded px-6 sm:px-6 p-2.5 border-black">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-900 h-12 w-12 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="font-medium text-xl text-gray-600">
              Total Expenses
            </div>
            <div className="flex self-center text-2xl font-semibold">
              &#8377; 20,000
            </div>
          </div>
          {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia tenetur nemo voluptates facere amet non laboriosam accusantium labore nisi voluptas. */}
        </div>

        <div className="grid gap-y-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {
            !loading && expenseData.map(function (data, index) {
              return <PersonalExpenseCard key={index} data={data} index={index} />
            })
          }
        </div>
        {
          loading ?
            <div className="w-full mt-5 flex gap-3 justify-center items-center">
              <svg role="status" class="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
              </svg>
              <div className="font-bold text-2xl">Loading...</div>
            </div> : null
        }
        {
          !loading && expenseData.length === 0 && <div className="text-2xl text-center font-bold text-red-600">
            NO EXPENSE RECORD
          </div>
        }
      </div>
    </>
  )
}

export default PersonalExpenses
