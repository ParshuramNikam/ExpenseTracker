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

  function onCloseModal() {
    setIsOpen(false);
  }

  function onOpenModal() {
    setIsOpen(true);
  }

  const calculateRoomRentStatus = async () => {
    setPaidAmount(0); setUnpaidAmount(0);
    setTimeout(() => {
      Object.keys(roomRentDetails).map(key => {
        if (roomRentDetails[key].paid === roomRentDetails[key].rent) {
          console.log("===");
          setPaidAmount(prevPaidAmount => prevPaidAmount + parseInt(roomRentDetails[key].paid))
        } else if (parseInt(roomRentDetails[key].paid) === 0) {
          console.log("else");
          setUnpaidAmount(prevUnpaidAmount => prevUnpaidAmount + roomRentDetails[key].rent)
        }
        // else if (parseInt(roomRentDetails[key].paid) <= parseInt(roomRentDetails[key].rent)) {
        //   console.log("<=");
        //   setPaidAmount(paidAmount + parseInt(roomRentDetails[key].paid));
        //   setUnpaidAmount(unpaidAmount + (parseInt(roomRentDetails[key].rent) - parseInt(roomRentDetails[key].paid)))
        // }
      })
    }, 1500);
  }

  const getAllTimeRoomRentDetails = () => {
    // to get months rents details & roomId and RoomExpense Doc having same values
    db.collection('RoomExpense').doc(roomId).get().then(snapshot => {
      setRoomRentDetails(snapshot.data())
    }).catch(err => console.log(err))
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

      {/* <div className="flex flex-col sm:flex-row">
        <div className="border-2 w-max mx-auto mb-1 sm:mb-5 flex items-center gap-3 bg-gray-50 m-2 rounded px-6 sm:px-6 p-2.5 border-black">
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
                &#8377; {paidAmount}
              </div>
            </div>
          </div>
        </div>
        <div className="border-2 w-max mx-auto mb-1 sm:mb-5 flex items-center gap-3 bg-gray-50 m-2 rounded px-6 sm:px-6 p-2.5 border-black">
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
        </div>
      </div> */}

      <div className="">
        <SingleRoomExpenseCard setRoomRentDetails={setRoomRentDetails} paidAmount={paidAmount} unpaidAmount={unpaidAmount} calculateRoomRentStatus={calculateRoomRentStatus} user={user} roomDetails={roomDetails} roomRentDetails={roomRentDetails} />

      </div>
    </div >
  );
};

export default SingleRoomAllRentDetails;
