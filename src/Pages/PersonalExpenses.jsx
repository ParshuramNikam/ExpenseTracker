import React, { useEffect, useState } from "react";
import ExpenseCard from "../components/ExpenseCard";
import PersonalExpenseCard from "../components/PersonalExpenseCard";
import { db } from "../database/firebase.config";
import firebase from "firebase";
import monthArray from '../utils/MonthArray';
import MonthArray from "../utils/MonthArray";

const PersonalExpenses = ({ user }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [inProcess, setInProcess] = useState(false);


  const [fetchData, setFetchData] = useState(true);
  const [loading, setLoading] = useState(true);

  const [allData, setAllData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [expenseTotal, setExpenseTotal] = useState(0);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [month, setMonth] = useState(monthArray[new Date().getMonth()]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [day, setDay] = useState(new Date().getDay() + 1);

  function onCloseModal() {
    setIsOpen(false);
  }

  const calculateExpense = async () => {
    setExpenseTotal(0);
    await expenseData.map(expense => {
      console.log("^^^^^^" + parseInt(expenseTotal + expense.expenseDetails.expenseAmount));
      setExpenseTotal(prevTotal => prevTotal + expense.expenseDetails.expenseAmount)
    })
  }

  const getMonthNumber = (inputMonth) => {
    if (MonthArray.indexOf(inputMonth) + 1 < 10) {
      const no = MonthArray.indexOf(inputMonth) + 1;
      return '0' + no;
    } else {
      return MonthArray.indexOf(inputMonth) + 1;
    }
  }

  const formatDay = (inputDay) => {
    if (inputDay < 10) {
      return '0' + inputDay;
    } else {
      return inputDay;
    }
  }

  const fetchDataFromDB = () => {
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
    }).then(() => {
      console.log("success");
      setAllData(expenseData);
      setLoading(false);
    })
      // .then(() => {
      //   calculateExpense().then(expense_total_amount => setExpenseTotal(expense_total_amount))
      // })
      .catch((err) => { console.log(err.message); setLoading(false); })
  }

  const setFilteredExpenseInData = async () => {
    // await setExpenseData(
    // allData.filter(data => {
    //   console.log(data.expenseDetails.date + "   " + `${year + '-' + getMonthNumber(month) + '-' + formatDay(day)}`);
    //   return data.expenseDetails.date === `${year + '-' + getMonthNumber(month) + '-' + formatDay(day)}`
    // })
    // )

    console.log('date', '==', `${year + '-' + getMonthNumber(month) + '-' + formatDay(day)}`);

    setExpenseData([]);

    db.collection("PersonalExpense")
      .where("date", "==", `${year + '-' + getMonthNumber(month) + '-' + formatDay(day)}`)
      .get().then(snapshot => {
        console.log();
        snapshot.docs.forEach(doc => {
          console.log("???", doc.data());
          setExpenseData(prevData => [...prevData, { expenseId: doc.id, expenseDetails: doc.data() }])
        })
      })
    return true
  }

  const fetchDataByFilter = async () => {
    console.log("Filter by : " + year + '-' + getMonthNumber(month) + '-' + formatDay(day));

    await setFilteredExpenseInData()
    // .then(() => {
    //   // setTimeout(() => {
    //   calculateExpense().then(expense_total_amount => setExpenseTotal(expense_total_amount))
    //   // calculateExpense();
    //   // calculateExpense();
    //   // }, 1000);
    // })

    console.log(
      allData.filter(data => data.expenseDetails.date === `${year + '-' + getMonthNumber(month) + '-' + formatDay(day)}`)
    );

    // setExpenseData(result);
  }

  useEffect(() => {
    setMonth(monthArray[new Date().getMonth()]);
    fetchDataFromDB();
  }, [fetchData, user])


  function onOpenModal() {
    setIsOpen(true);
  }


  const addPersonalExpenseInDB = () => {
    setInProcess(true);

    if (title && amount && date) {
      db.collection('PersonalExpense').doc().set({
        addedBy: user.uid,
        title: title,
        desc: desc,
        expenseAmount: parseInt(amount),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        date: date,
        time: time
      })
        .then(() => {
          console.log("Document successfully added to personal expense!");
          setTime(""); setDate(""); setAmount(""); setTitle(""); setDesc("");
          setIsOpen(false);
          alert("Personal expense added succesfully!")
          setTimeout(() => {
            setInProcess(false);
            fetchDataFromDB();
          }, 1000);
        })
        .catch((error) => {
          setInProcess(false);
          console.error("Error writing document: ", error);
        });
      }else{
      setInProcess(false);
      alert("Title, Amount, Date required!")

    }
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
              {user.username}
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

        <div className="border-2 w-max mx-auto mb-5  gap-3 bg-gray-50 m-2 rounded px-6 sm:px-6 p-2.5 border-black">
          <div className="flex items-center">
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
                &#8377; {expenseTotal}
              </div>
            </div>
          </div>
          <div className="max-w-max mx-auto mt-1">
            <button className="flex gap-x-2 justify-center items-center bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-md"
              onClick={calculateExpense}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <div className="font-semibold text-lg">Refresh</div>
            </button>
          </div>
        </div>

        <div className="mx-auto w-full sm:max-w-lg border-2 shadow-md border-gray-500 p-3 rounded-xl">
          <div className="text-gray-900 font-semibold flex justify-between flex-wrap items-center gap-1 border-b border-b-gray-500 w-full p-1 mb-2">
            <div className="flex items-center text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Apply filter :
            </div>
            <button className="text-right shadow-lg md:w-auto md:mx-0  bg-red-500 hover:bg-gray-600 transition duration-50 delay-100 hover:delay-100 text-white px-4 py-2 rounded-lg"
              onClick={fetchDataByFilter}
            >
              Search
            </button>
          </div>
          <div className="mb-2">
            <div className="mb-2">
              <label className="font-semibold mr-2" htmlFor="year" >
                Choose Day:
              </label>
              <input type="number" name="day" id="day" placeholder="Enter Year"
                className="p-1 border-2 rounded text-gray-800 border-gray-800"
                value={day} onChange={(e) => setDay(e.target.value)}
              />
            </div>

            <label htmlFor="month" className="font-semibold mr-2">Choose month:</label>
            <select name="month" id="month" className="px-2 py-1 border-2 rounded text-gray-800 border-gray-800 cursor-pointer"
              value={month} onChange={(e) => setMonth(e.target.value)}
            >
              <option value="jan" className="p-1 text-emerald-600">Jan</option>
              <option value="feb" className="p-1 text-emerald-600">Feb</option>
              <option value="mar" className="p-1 text-emerald-600">Mar</option>
              <option value="apr" className="p-1 text-emerald-600">Apr</option>
              <option value="may" className="p-1 text-emerald-600">May</option>
              <option value="jun" className="p-1 text-emerald-600">Jun</option>
              <option value="jul" className="p-1 text-emerald-600">Jul</option>
              <option value="aug" className="p-1 text-emerald-600">Aug</option>
              <option value="sep" className="p-1 text-emerald-600">Sep</option>
              <option value="oct" className="p-1 text-emerald-600">Oct</option>
              <option value="nov" className="p-1 text-emerald-600">Nov</option>
              <option value="dec" className="p-1 text-emerald-600">Dec</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="font-semibold mr-2" htmlFor="year" >
              Choose Year:
            </label>
            <input type="number" name="year" id="year" placeholder="Enter Year"
              className="p-1 border-2 rounded text-gray-800 border-gray-800"
              value={year} onChange={(e) => setYear(e.target.value)}
            />
          </div>
        </div>

        <div className="px-4 mt-3">
          <div className="border-b mb-2 border-b-gray-500 h-0 "></div>
        </div>

        <div className="flex justify-center mb-2">
          <button className="flex justify-center items-center gap-x-2 gap-y-1 text-center shadow-lg md:w-auto md:mx-0  bg-green-600 hover:bg-gray-600 transition duration-50 delay-100 hover:delay-100 text-white px-5 py-3 rounded-lg"
            onClick={fetchDataFromDB}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            <div>Get All Time Expense Details</div>
          </button>
        </div>

        <div className="grid gap-y-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 pb-5">
          {
            !loading && expenseData.map(function (data, index) {
              return <PersonalExpenseCard key={index} fetchDataFromDB={fetchDataFromDB} data={data} index={index} />
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
