import React, { useEffect, useState } from "react";
import BussinessExpenseCard from "../components/BussinessExpenseCard";
import ExpenseCard from "../components/ExpenseCard";
import PersonalExpenseCard from "../components/PersonalExpenseCard";
import RentExpenseCard from "../components/RentExpenseCard";
import MonthArray from "../utils/MonthArray";
import firebase from "firebase";
import { db } from "../database/firebase.config";
import uuidv4 from "../utils/UuidGenerator";

const RentsExpenses = ({ user }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [inProcess, setInProcess] = useState(false);

  const [fetchData, setFetchData] = useState(true);
  const [loading, setLoading] = useState(true);

  const [allData, setAllData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [expenseTotal, setExpenseTotal] = useState(0);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [rentAmount, setRentAmount] = useState("");

  function onCloseModal() {
    setIsOpen(false);
  }

  function onOpenModal() {
    setIsOpen(true);
  }

  const addMonthsForEachRoom = (e) => {
    const ans = prompt("Are you sure? Do you want to add Rooms. Type 'yes' if you want to add");
    if (ans && ans.toLowerCase().replace(/ /g, '') === 'yes') {
      let monthNo = prompt("Enter month number (1-12)");
      let year = prompt("Enter year number. For ex: 2022");

      if (monthNo && year) {
        if (monthNo - 1 < 10) {
          monthNo = '0' + monthNo;
        }
        db.collection('RoomExpense').get().then(snapshot => {
          // console.log(snapshot.docs[0].data());
          snapshot.docs.forEach(async doc => {

            console.log(MonthArray[monthNo - 1] + "  " + doc.id);

            let roomRentAmount = undefined;

            await db.collection('RoomsDetails').where('uuid', '==', doc.id).get().then(snapshot2 => {
              snapshot2.docs.forEach(doc => {
                roomRentAmount = doc.data().rentAmount;
              })
            }).then(async () => {

              await db.collection('RoomExpense').doc(doc.id).update({
                ...doc.data(),
                [monthNo + '-' + year]: {
                  paid: 0,
                  rent: roomRentAmount
                }
              }).then(() => {
                console.log(doc.id + " month added succesfully!");
              })

            })



          })
        })
      }
    }
  }

  const addNewRoomInDB = async () => {
    setInProcess(true);
    const roomUUID = await uuidv4();
    db.collection('RoomsDetails').doc().set({
      addedBy: user.uid,
      uuid: roomUUID,
      name: name,
      location: location,
      tenantName: tenantName,
      rentAmount: parseInt(rentAmount),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
      .then(() => {
        console.log("Document successfully added to personal expense!");
        setName(""); setLocation(""); setTenantName(""); setRentAmount("");
        setIsOpen(false);
        alert("New Room added succesfully!")
        setTimeout(() => {
          setInProcess(false);
          fetchDataFromDB();
        }, 1000);
      }).then(() => {
        // create empty room with current month data :-
        db.collection('RoomExpense').doc(roomUUID).set(
          {
            [`${parseInt(new Date().getMonth() + 1) < 10 ? `0${parseInt(new Date().getMonth() + 1)}` : parseInt(new Date().getMonth())}-${new Date().getFullYear()}`]: {
              rent: parseInt(rentAmount),
              paid: 0
            }
          }
        ).catch(err => console.log(err.message))
      })
      .catch((error) => {
        setInProcess(false);
        console.error("Error writing document: ", error);
      });


  }

  const fetchDataFromDB = () => {
    db.collection('RoomsDetails').get().then(snapshot => {
      setLoading(true);
      setExpenseData([])
      snapshot.docs.forEach(doc => {
        setExpenseData((prevArr) => [
          ...prevArr,
          { expenseId: doc.id, roomDetails: doc.data() },
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

  useEffect(() => {
    fetchDataFromDB();
  }, [fetchData, user])

  return (
    <div className="bg-gray-200 min-h-screen">
      <h1 className="text-2xl md:text-3xl text-black  pt-3 ml-3 mb-0 font-bold">
        Room Rent Expenses
      </h1>
      <div className="m-2 mb-0 md:flex justify-between">
        <div className="flex md:w-max items-center gap-1.5 my-4">
          <p className="text-black font-normal text-xl ml-2">Welcome back,</p>
          <h3 className="whitespace-nowrap text-green-600 font-semibold  text-xl">
            {user.username}
          </h3>
        </div>

        {!isOpen && (
          <div className="mt-2 ">
            <button
              className='shadow-lg md:w-auto mx-auto md:mx-0 flex justify-center items-center gap-1 bg-green-600 hover:bg-gray-600 transition duration-50 delay-100 hover:delay-100" text-white px-4 py-4 md:py-2 rounded-lg'
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
              <p className="text-base md:text-lg ">Add New Room</p>
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
              ADD ROOM DETAILS
            </h3>
            <input
              type="text"
              name="room_name"
              id="room_name"
              placeholder="Room Name"
              value={name} onChange={(e) => setName(e.target.value)}
              className="mt-4 w-full border-2 rounded-3xl p-1 pl-4 outline-none placeholder-black  border-gray-400"
            />
            <input
              type="text"
              name="room_location"
              id="room_location"
              placeholder="Room Location"
              value={location} onChange={(e) => setLocation(e.target.value)}
              className="mt-4 w-full border-2 rounded-3xl p-1 pl-4 outline-none placeholder-black  border-gray-400"
            />
            <input
              type="text"
              name="tenant_name"
              id="tenant_name"
              placeholder="Tenant Name"
              value={tenantName} onChange={(e) => setTenantName(e.target.value)}
              className="mt-4 w-full border-2 rounded-3xl p-1 pl-4 outline-none placeholder-black  border-gray-400"
            />
            <input
              type="number"
              name="rent"
              id="rent"
              placeholder="&#8377; Rent Amount"
              value={rentAmount} onChange={(e) => setRentAmount(e.target.value)}
              className="mt-2 w-full border-2 rounded-3xl placeholder-black p-1 pl-4 outline-none border-gray-400"
            />

            <div className="flex flex-col">
              <button
                type="button"
                onClick={addNewRoomInDB}
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

      {/* <div className="flex flex-col sm:flex-row">
        <div className="border-2 w-max mx-auto mb-5 flex items-center gap-3 bg-gray-50 m-2 rounded px-6 sm:px-6 p-2.5 border-black">
          <div className="flex">
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
              <div className="font-medium text-xl text-green-600">
                Paid Rent
              </div>
              <div className="flex self-center text-2xl font-semibold">
                &#8377; 20,000
              </div>
            </div>
          </div>
        </div>
        <div className="border-2 w-max mx-auto mb-5 flex items-center gap-3 bg-gray-50 m-2 rounded px-6 sm:px-6 p-2.5 border-black">
          <div className="flex">
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
              <div className="font-medium text-xl text-red-600">
                Unpaid Rent
              </div>
              <div className="flex self-center text-2xl font-semibold">
                &#8377; 20,000
              </div>
            </div>
          </div>
        </div>
      </div> */}


      <div className="flex justify-center mb-2 mx-2">
        <button className="flex gap-2 justify-center items-center  text-lg bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md"
          onClick={addMonthsForEachRoom}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          <div>
            Add new month entries for each room
          </div>
        </button>
      </div>

      <div className="px-4 mb-3">
        <div className="border-b mb-2 border-b-gray-500 h-0 "></div>
      </div>

      <div className="font-semibold text-lg mx-2 rounded w-max px-4 py-1 mb-2 bg-green-100 text-green-600 border-2 border-green-600">
        Current Month : {MonthArray[new Date().getMonth()].toString().toUpperCase()}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4">
        {
          !loading && expenseData.map(function (data, index) {
            return <RentExpenseCard key={index} data={data} index={index} />
          })
        }
      </div>
      {
        loading ?
          <div className="w-full mt-5 flex gap-3 justify-center items-center">
            <svg role="status" class="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  );
};

export default RentsExpenses;
