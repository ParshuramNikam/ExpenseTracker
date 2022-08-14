import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleRoomExpenseCard from "../components/SingleRoomExpenseCard.jsx";
import { db } from "../database/firebase.config.js";

const SingleRoomAllRentDetails = ({ user }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [roomDetails, setRoomDetails] = useState({});
  const [roomRentDetails, setRoomRentDetails] = useState({});
  const { roomId } = useParams();

  const [inputRoomName, setInputRoomName] = useState("");
  const [inputPaidAmount, setInputPaidAmount] = useState("");

  const [paidAmount, setPaidAmount] = useState(0);
  const [unpaidAmount, setUnpaidAmount] = useState(0);

  const [showFilterData, setShowFilterData] = useState({});

  const [calculationMode, setCalculationMode] = useState('all');

  function onCloseModal() {
    setIsOpen(false);
  }

  function onOpenModal() {
    setIsOpen(true);
  }

  const calculateRoomRentStatus = async () => {

    setPaidAmount(0); setUnpaidAmount(0);
    setTimeout(() => {
      console.log("paidAmount : " + paidAmount);

      if (calculationMode === 'filter') {
        // setPaidAmount(0); setUnpaidAmount(0);
        Object.keys(showFilterData).map(key => {
          console.log(key, showFilterData[key]);
          console.log(showFilterData[key].paid);
          if (showFilterData[key].paid === showFilterData[key].rent) {
            console.log("===");
            setPaidAmount(prevPaidAmount => prevPaidAmount + parseInt(showFilterData[key].paid))
          } else if (parseInt(showFilterData[key].paid) === 0) {
            console.log("else");
            setUnpaidAmount(prevUnpaidAmount => prevUnpaidAmount + parseInt(showFilterData[key].rent))
          }
          else if (parseInt(showFilterData[key].paid) <= parseInt(showFilterData[key].rent)) {
            console.log("<=");
            setPaidAmount(prevPaidAmount => prevPaidAmount + parseInt(showFilterData[key].paid));
            setUnpaidAmount(prevUnpaidAmount => prevUnpaidAmount + (parseInt(showFilterData[key].rent) - parseInt(showFilterData[key].paid)))
          } else if (parseInt(showFilterData[key].paid) > parseInt(showFilterData[key].rent)) {
            console.log("<=");
            setPaidAmount(prevPaidAmount => prevPaidAmount + parseInt(showFilterData[key].paid));
            setUnpaidAmount(prevUnpaidAmount => prevUnpaidAmount + (parseInt(showFilterData[key].rent) - parseInt(showFilterData[key].paid)))
          }
        })
      }
      else if (calculationMode === 'all') {
        Object.keys(roomRentDetails).map(key => {
          console.log(key, roomRentDetails[key]);
          if (roomRentDetails[key].paid === roomRentDetails[key].rent) {
            console.log("===");
            setPaidAmount(prevPaidAmount => prevPaidAmount + parseInt(roomRentDetails[key].paid))
          } else if (parseInt(roomRentDetails[key].paid) === 0) {
            console.log("else");
            setUnpaidAmount(prevUnpaidAmount => prevUnpaidAmount + parseInt(roomRentDetails[key].rent))
          }
          else if (parseInt(roomRentDetails[key].paid) <= parseInt(roomRentDetails[key].rent)) {
            console.log("<=");
            setPaidAmount(prevPaidAmount => prevPaidAmount + parseInt(roomRentDetails[key].paid));
            setUnpaidAmount(prevUnpaidAmount => prevUnpaidAmount + (parseInt(roomRentDetails[key].rent) - parseInt(roomRentDetails[key].paid)))
          }
        })
      }
    }, 500);
  }

  const getAllTimeRoomRentDetails = () => {
    setRoomRentDetails({});
    // to get months rents details & roomId and RoomExpense Doc having same values
    db.collection('RoomExpense').doc(roomId).get().then(async snapshot => {
      // setRoomRentDetails(snapshot.data());

      // sorting keys as per month-year
      let sortedKeysArr = await Object.keys(snapshot.data()).sort(function (a, b) {
        a = a.split("-");
        b = b.split("-")
        return new Date(a[1], a[0], 1) - new Date(b[1], b[0], 1)
      }).map(async key => {
        await setRoomRentDetails((prevRoomDetails) => {
          console.log(key, ":", snapshot.data()[key]);
          return { ...prevRoomDetails, [key]: snapshot.data()[key] }
        });
      })

      // return { sortedKeysArr: sortedKeysArr, snapshotData: snapshot.data() }

    }).then(() => { console.log("getAllTimeRoomRentDetails fetched sucesfully"); })
      .catch(err => console.log(err))
  }



  useEffect(() => {
    // to get room details
    db.collection('RoomsDetails').get().then(snapshot => {
      console.log(roomId);
      snapshot.docs.forEach(doc => {
        if (doc.data()['uuid'] === roomId) {
          setRoomDetails({ docId: doc.id, ...doc.data() });
        }
      })
    }).then(() => {
      getAllTimeRoomRentDetails();
    }).catch(err => console.log(err.message))
  }, [roomId])

  return (
    <div className="bg-gray-200 min-h-screen">
      <h1 className="text-2xl md:text-3xl text-black  pt-3 ml-3 mb-0 font-bold">
        Room Rent Expenses
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
          <h3 className="whitespace-nowrap text-green-600 font-semibold  text-xl">
            Jhon Doe
          </h3>
        </div>
      </div>

      <div className="font-bold text-xl text-green-900 my-1 flex items-center justify-center gap-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        <div>Room Name : <span>{roomDetails.name}</span></div>
      </div>

      <div className="flex w-max sm:gap-x-3 mx-auto justify-center flex-col sm:flex-row">
        <div className="border-2 w-max mx-auto mb-1 sm:mb-5 flex items-center gap-3 bg-gray-50 m-2 rounded px-6 sm:px-6 p-2.5 border-black">
          <div>
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
                  &nbsp;&nbsp;Paid Rent&nbsp;&nbsp;
                </div>
                <div className="flex self-center text-2xl font-semibold">
                  &#8377; {paidAmount}
                </div>
              </div>
            </div>
            <div className="max-w-max mx-auto mt-1">
              <button className="flex gap-x-2 justify-center items-center bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-md"
                onClick={() => { setPaidAmount(0); setUnpaidAmount(0); calculateRoomRentStatus(); }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <div className="font-semibold text-lg">Refresh</div>
              </button>
            </div>
          </div>
        </div>
        <div className="border-2 w-max mx-auto mb-1 sm:mb-5 flex items-center gap-3 bg-gray-50 m-2 rounded px-6 sm:px-6 p-2.5 border-black">
          <div>
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
                  &#8377; {unpaidAmount}
                </div>
              </div>
            </div>
            <div className="max-w-max mx-auto mt-1">
              <button className="flex gap-x-2 justify-center items-center bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-md"
                onClick={() => { setPaidAmount(0); setUnpaidAmount(0); calculateRoomRentStatus(); }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <div className="font-semibold text-lg">Refresh</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        {
          roomRentDetails && roomDetails ?
            <SingleRoomExpenseCard calculationMode={calculationMode} setCalculationMode={setCalculationMode} setShowFilterData={setShowFilterData} showFilterData={showFilterData} roomId={roomId} getAllTimeRoomRentDetails={getAllTimeRoomRentDetails} setRoomRentDetails={setRoomRentDetails} paidAmount={paidAmount} unpaidAmount={unpaidAmount} calculateRoomRentStatus={calculateRoomRentStatus} user={user} roomDetails={roomDetails} roomRentDetails={roomRentDetails} />
            : <div className="w-full mt-5 flex gap-3 justify-center items-center">
              <svg role="status" class="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
              </svg>
              <div className="font-bold text-2xl">Loading...</div>
            </div>
        }
      </div>
    </div >
  );
};

export default SingleRoomAllRentDetails;
