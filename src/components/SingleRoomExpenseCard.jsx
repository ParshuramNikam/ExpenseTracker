import React, { useEffect, useState } from "react";
import { db } from "../database/firebase.config";
import MonthArray from "../utils/MonthArray";
import RoomMonthExpenseCard from "./RoomMonthExpenseCard";

const monthArr = ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dec'];

function SingleRoomExpenseCard({ getAllTimeRoomRentDetails, setRoomRentDetails, roomRentDetails, roomDetails, user, calculateRoomRentStatus, paidAmount, unpaidAmount }) {
  const [month, setMonth] = useState(monthArr[new Date().getMonth()]);
  const [year, setYear] = useState(new Date().getFullYear());

  const [roomName, setRoomName] = useState(roomDetails.name);
  const [tenantName, setTenantName] = useState(roomDetails.tenantName);
  const [roomLocation, setRoomLocation] = useState(roomDetails.location);
  const [roomRent, setRoomRent] = useState(roomDetails.rentAmount);

  const [edit, setEdit] = useState(false);

  const changeRoomDetails = (e) => {
    setEdit(!edit);
    if (edit) {
      console.log("updainf........");

      if (!roomName || !roomLocation || !roomRent) {
        alert("Fields required!")
        setRoomName(roomDetails.name);
        setRoomRent(roomDetails.rentAmount);
        setRoomLocation(roomDetails.location);
        console.log("Room details not updated in DB");
      } else {
        db.collection('RoomsDetails').where('uuid', '==', roomDetails.uuid).get().then((snapshot) => {
          snapshot.docs.forEach(doc => {
            console.log(doc.id);
            db.collection('RoomsDetails').doc(doc.id).update({
              name: roomName,
              location: roomLocation,
              rentAmount: roomRent,
              tenantName: tenantName
            }).then(() => console.log("updated..."))
          })
        }).catch(err => console.log(err))
      }



    }
  }

  const getMonthNumber = (inputMonth) => {
    if (MonthArray.indexOf(inputMonth) + 1 < 10) {
      const no = MonthArray.indexOf(inputMonth) + 1;
      return '0' + no;
    } else {
      return MonthArray.indexOf(inputMonth) + 1;
    }
  }

  const applyFilter = () => {
    console.log(roomRentDetails[`${getMonthNumber(month)}-${year}`]);
  }

  useEffect(() => {
    setMonth(monthArr[new Date().getMonth()])
    setRoomLocation(roomDetails.location)
    setRoomName(roomDetails.name)
    setRoomRent(roomDetails.rentAmount)
    setTenantName(roomDetails.tenantName)
  }, [roomDetails, roomRentDetails])

  return (
    <div>
      <div className="mx-2">
        <div className="max-w-5xl mx-auto mb-4 mt-3 gap-2">

          {/* <div className="mx-auto w-full sm:max-w-lg border-2 shadow-md border-gray-500 p-3 rounded-xl">
            <div className="text-gray-900 font-semibold flex justify-between flex-wrap items-center gap-1 border-b border-b-gray-500 w-full p-1 mb-2">
              <div className="flex items-center text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Apply filter :
              </div>
              <button className="text-right shadow-lg md:w-auto md:mx-0  bg-green-600 hover:bg-gray-600 transition duration-50 delay-100 hover:delay-100 text-white px-4 py-2 rounded-lg"
                onClick={applyFilter}
              >
                Search
              </button>
            </div>
            <div className="mb-2">
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
          </div> */}

          {/* Room details : */}
          <div className="flex text-center justify-center items-center font-semibold mx-auto w-full sm:max-w-lg border-2 shadow-md border-gray-500 p-3 rounded-xl">
            <div>
              <div className="mb-1">
                Room name: &nbsp;&nbsp;
                {/* <span className="font-normal">{"John Doe"}</span>  */}
                <input type="text" name="name" id="name" disabled={!edit}
                  className={`mx-1 ${edit ? "border-2 border-gray-700" : "text-center"} text-gray-900 p-0.5 rounded`}
                  value={roomName} onChange={(e) => setRoomName(e.target.value)}
                />
              </div>
              <div className="mb-1">
                Tenant name: &nbsp;&nbsp;
                {/* <span className="font-normal">{"John Doe"}</span>  */}
                <input type="text" name="name" id="name" disabled={!edit}
                  className={`mx-1 ${edit ? "border-2 border-gray-700" : "text-center"} text-gray-900 p-0.5 rounded`}
                  value={tenantName} onChange={(e) => setTenantName(e.target.value)}
                />
              </div>
              <div className="mb-1">
                Room location:
                {/* <span className="font-normal">{"Khopoli"}</span> */}
                <input type="text" name="location" id="location" disabled={!edit}
                  className={`mx-1 ${edit ? "border-2 border-gray-700" : "text-center"} text-gray-900 p-0.5 rounded`}
                  value={roomLocation} onChange={(e) => setRoomLocation(e.target.value)}
                />
              </div>
              <div className="mb-1">
                Room rent: &nbsp;&nbsp;&nbsp;
                {/* <span className="font-normal">{5000} &#8377;</span> */}
                &#8377;
                <input type="number" name="rent" id="rent" disabled={!edit}
                  className={`mx-1 ${edit ? "border-2 border-gray-700" : "text-center"} text-gray-900 p-0.5 rounded`}
                  value={roomRent} onChange={(e) => setRoomRent(e.target.value)}
                />
              </div>
              <button className="mt-2 text-center shadow-lg md:w-auto md:mx-0  bg-green-600 hover:bg-gray-600 transition duration-50 delay-100 hover:delay-100 text-white px-4 py-2 rounded-lg"
                onClick={changeRoomDetails}
              >
                {edit ? "Update Details" : "Edit Details"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4">
        <div className="border-b mb-2 border-b-gray-500 h-0 "></div>
      </div>

      <div className="flex justify-center mb-2">
        <button className="flex justify-center items-center gap-x-2 gap-y-1 text-center shadow-lg md:w-auto md:mx-0  bg-green-600 hover:bg-gray-600 transition duration-50 delay-100 hover:delay-100 text-white px-5 py-3 rounded-lg"
          onClick={calculateRoomRentStatus}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
          <div>Get All Time Rent Details</div>
        </button>
      </div>

      {/* card */}
      <div className="">
        <div className="sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">

          {
            Object.keys(roomRentDetails).map((key, index) =>
              <RoomMonthExpenseCard key={index} getAllTimeRoomRentDetails={getAllTimeRoomRentDetails} month={key} user={user} roomId={roomDetails.uuid} roomRentDetails={roomRentDetails} rentDetailOfSingleMonth={roomRentDetails[key]} />
            )
          }

        </div>
      </div>

    </div>
  );
}

export default SingleRoomExpenseCard;
