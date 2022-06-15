import React, { useState, useEffect } from 'react'
import SingleSiteExpenseCard from './SingleSiteExpenseCard';
import { useParams } from "react-router-dom";
import { db } from "../database/firebase.config.js";
import BussinessExpenses from './BussinessExpenses';
import firebase from 'firebase';
import MonthArray from '../utils/MonthArray';

function SingleSiteExpenseDetails({ user }) {
  const { siteId } = useParams();
  let [isOpen, setIsOpen] = useState(false);
  const [siteDetails, setSiteDetails] = useState({});

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [refreshData, setRefreshData] = useState(true);
  const [loading, setLoading] = useState(true);

  const [expenseTotal, setExpenseTotal] = useState(0);
  const [expenseDetails, setExpenseDetails] = useState([]);
  const [allExpenseDetails, setAllExpenseDetails] = useState([]);

  const [month, setMonth] = useState(MonthArray[new Date().getMonth()]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [day, setDay] = useState(new Date().getDay() + 1);

  const [filterType, setFilterType] = useState("day");

  function onCloseModal() {
    setIsOpen(false);
  }

  function onOpenModal() {
    setIsOpen(true);
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


  const calculateExpense = async () => {
    setExpenseTotal(0);
    await expenseDetails.map(expense => {
      console.log("^^^^^^" + parseInt(expenseTotal + expense.details.expenseAmount));
      setExpenseTotal(prevTotal => prevTotal + expense.details.expenseAmount)
    })
  }

  const setFilteredExpenseInData = async () => {
    // await setExpenseData(
    // allData.filter(data => {
    //   console.log(data.expenseDetails.date + "   " + `${year + '-' + getMonthNumber(month) + '-' + formatDay(day)}`);
    //   return data.expenseDetails.date === `${year + '-' + getMonthNumber(month) + '-' + formatDay(day)}`
    // })
    // )

    console.log('date', '==', `${year + '-' + getMonthNumber(month) + '-' + formatDay(day)}`);

    setExpenseDetails([]);

    // db.collection("BusinessExpense")
    // .where("date", "==", `${year + '-' + getMonthNumber(month) + '-' + formatDay(day)}`)
    // .get().then(snapshot => {
    //   snapshot.docs.forEach(doc => {
    //     console.log("???", doc.data());
    //     if (doc.data().siteId === siteId) {
    //       setExpenseDetails(prevData => [...prevData, { docId: doc.id, details: doc.data() }])
    //     }
    //   })
    // ).catch(err => console.log(err))

    db.collection('BusinessExpense').where("addedBy", "==", user.uid).get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          if (filterType === "day") {
            if (doc.data().date === `${year + '-' + getMonthNumber(month) + '-' + formatDay(day)}`) {
              console.log("++++", doc.data());
              setExpenseDetails((prevArr) => [
                ...prevArr,
                { docId: doc.id, details: doc.data() },
              ]);
            }
          } else if (filterType === 'month') {
            if (doc.data().monthYear === year + '-' + getMonthNumber(month)) {
              console.log("++++", doc.data());
              setExpenseDetails((prevArr) => [
                ...prevArr,
                { docId: doc.id, details: doc.data() },
              ]);
            }
          }
        })
      })

    return true

  }

  const fetchDataByFilter = async () => {
    console.log("Filter by : " + year + '-' + getMonthNumber(month) + '-' + formatDay(day));

    await setFilteredExpenseInData().then(() => console.log(">>>>", expenseDetails))
    // .then(() => {
    //   // setTimeout(() => {
    //   calculateExpense().then(expense_total_amount => setExpenseTotal(expense_total_amount))
    //   // calculateExpense();
    //   // calculateExpense();
    //   // }, 1000);
    // })

    // console.log(
    //   setAllExpenseDetails.filter(data => data.expenseDetails.date === `${year + '-' + getMonthNumber(month) + '-' + formatDay(day)}`)
    // );



    // setExpenseData(result);
  }

  const addExpenseInSite = async () => {
    if (title && amount && date) {
      await db.collection('BusinessExpense').doc().set({
        addedBy: user.uid,
        siteId: siteId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        expenseAmount: parseInt(amount),
        title: title,
        desc: desc,
        timestamp: `${date} | ${time}`,
        date: date,
        monthYear: date.split("-")[0] + "-" + date.split("-")[1],
        time: time
      }).then(() => {
        console.log("Expense added sucesfully!");
        setTime(""); setDate(""); setTitle(""); setDesc(""); setAmount("");
        setIsOpen(false);
        setRefreshData(!refreshData);
      }).catch(err => {
        console.log(err.message);
      })
    } else {
      alert("Title, amount, date these fields required!")
    }
  }

  const getAllSitesDetails = () => {
    setLoading(true);
    db.collection('BusinessExpense').where("siteId", '==', siteId).get().then(snapshot => {
      setExpenseDetails([])
      setAllExpenseDetails([])
      snapshot.docs.forEach(doc => {
        console.log(">>>>", doc.data());
        if (doc.data().addedBy === user.uid) {
          setExpenseDetails((prevArr) => [
            ...prevArr,
            { docId: doc.id, details: doc.data() },
          ]);
          setAllExpenseDetails((prevArr) => [
            ...prevArr,
            { docId: doc.id, details: doc.data() },
          ])
        }
      })

    }).then(() => {
      console.log("******************");
      console.log(expenseDetails, allExpenseDetails);
      console.log("******************");
      setLoading(false);

    }).catch(err => {
      console.log(err.message);
      setLoading(false)
    })
  }

  useEffect(() => {
    getAllSitesDetails()
    db.collection('BusinessDetails').where("uuid", '==', siteId).get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        console.log(doc.data());
        setSiteDetails({ docId: doc.id, ...doc.data() });
      })
    })
  }, [])


  return (
    <div className="bg-gray-200 min-h-screen">
      <h1 className="text-2xl md:text-3xl text-black  pt-3 ml-3 mb-0 font-bold">
        Construction Site Expenses
      </h1>
      <div className="m-2 mb-0 md:flex justify-between">
        <div className="flex md:w-max items-center gap-1.5 my-4">
          {/* <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                            alt='Profile Pic'
                            className='w-10 h-10 rounded-full'
                        /> */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                            </svg> */}
          <p className="text-black font-normal text-xl ml-2">Welcome back,</p>
          <h3 className="whitespace-nowrap text-purple-500 font-semibold  text-xl">
            Jhon Doe
          </h3>
        </div>



        {!isOpen && (
          <div className="mt-2 ">
            <button
              className='shadow-lg md:w-auto mx-auto md:mx-0 flex justify-center items-center gap-1 bg-purple-500 hover:bg-gray-600 transition duration-50 delay-100 hover:delay-100" text-white px-4 py-4 md:py-2 rounded-lg'
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
              <p className="text-base md:text-lg ">Add Site Expense</p>
            </button>
          </div>
        )}
      </div>

      <div className="font-bold text-xl text-purple-900 my-1 flex items-center justify-center gap-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        <div>Site Name : <span>{siteDetails.name}</span></div>
      </div>

      {/*  show hide to add new expense */}
      <div className="flex justify-center  ">
        <div
          className={`${!isOpen && "hidden"
            } max-w-xl  mb-5 transition delay-150 duration-300 ease-in-out  mx-2`}
        >
          <form className=" bg-gray-100 rounded mt-1 p-2">
            <h3 className="text-center text-xl text-black font-semibold">
              ADD SITE DETAILS
            </h3>
            <input
              type="text"
              name="expense_title"
              id="expense_title"
              placeholder="Expense Title"
              value={title} onChange={(e) => setTitle(e.target.value)}
              className="mt-4 w-full border-2 rounded-3xl p-1 pl-4 outline-none placeholder-black  border-gray-400"
            />
            <input
              type="text"
              name="expense_desc"
              id="expense_desc"
              placeholder="Expense Description"
              value={desc} onChange={(e) => setDesc(e.target.value)}
              className="mt-4 w-full border-2 rounded-3xl p-1 pl-4 outline-none placeholder-black  border-gray-400"
            />
            <input
              type="number"
              name="expense_amount"
              id="expense_amount"
              placeholder="Expense Amount"
              value={amount} onChange={(e) => setAmount(e.target.value)}
              className="mt-4 w-full border-2 rounded-3xl p-1 pl-4 outline-none placeholder-black  border-gray-400"
            />
            <input
              type="date"
              name="expense_date"
              id="expense_date"
              value={date} onChange={(e) => setDate(e.target.value)}
              className="mt-4 w-full border-2 rounded-3xl p-1 pl-4 outline-none placeholder-black  border-gray-400"
            />
            <input
              type="time"
              name="expense_time"
              id="expense_time"
              value={time} onChange={(e) => setTime(e.target.value)}
              className="mt-4 w-full border-2 rounded-3xl p-1 pl-4 outline-none placeholder-black  border-gray-400"
            />
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => addExpenseInSite()}
                className="mx-auto mt-3 w-full rounded-3xl hover:bg-indigo-800 bg-indigo-600 font-semibold text-lg py-2 px-3.5 flex items-center flex-nowrap  text-white justify-center"
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


      <div className="">
        <SingleSiteExpenseCard filterType={filterType} setFilterType={setFilterType} getAllSitesDetails={getAllSitesDetails} fetchDataByFilter={fetchDataByFilter} month={month} setMonth={setMonth} year={year} setYear={setYear} day={day} setDay={setDay} setLoading={setLoading} loading={loading} allExpenseDetails={allExpenseDetails} setAllExpenseDetails={setAllExpenseDetails} setExpenseDetails={setExpenseDetails} expenseDetails={expenseDetails} refreshData={refreshData} user={user} siteId={siteId} siteDetails={siteDetails} setSiteDetails={setSiteDetails} />
      </div>

    </div >
  );
}

export default SingleSiteExpenseDetails