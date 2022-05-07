import React, { useState, useEffect } from "react";
import SiteDetails from "../components/SiteDetails";
import MonthArray from "../utils/MonthArray";

const SingleSiteExpenseCard = () => {
  const [month, setMonth] = useState(MonthArray[new Date().getMonth()]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [day, setDay] = useState(new Date().getDay()+1);

  const [siteName, setSiteName] = useState("Room 1");
  const [siteLocation, setSiteLocation] = useState("Khopoli");

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setMonth(MonthArray[new Date().getMonth()]);
  }, []);

  return (
    <div>
      <div className="mx-2">
        <div className="max-w-5xl mx-auto mb-4 mt-3 gap-2 grid grid-cols-1 sm:grid-cols-2">
          <div className="mx-auto w-full sm:max-w-lg border-2 shadow-md border-gray-500 p-3 rounded-xl">
            <div className="text-gray-900 font-semibold flex justify-between flex-wrap items-center gap-1 border-b border-b-gray-500 w-full p-1 mb-2">
              <div className="flex items-center text-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
                Apply filter :
              </div>
              <button className="text-right shadow-lg md:w-auto md:mx-0  bg-purple-500 hover:bg-gray-600 transition duration-50 delay-100 hover:delay-100 text-white px-4 py-2 rounded-lg">
                Search
              </button>
            </div>
            <div className="mb-2">
            <div className="mb-2">
              <label className="font-semibold mr-2" htmlFor="day">
                Choose Day:
              </label>
              <input
                type="number"
                name="day"
                id="day"
                placeholder="Enter Day"
                className="p-1 ml-5 border-2 rounded text-gray-800 border-gray-800"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              />
            </div>
              <label htmlFor="month" className="font-semibold mr-2">
                Choose month:
              </label>
              <select
                name="month"
                id="month"
                className="px-2 py-1 border-2 rounded text-gray-800 border-gray-800 cursor-pointer"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="feb" className="p-1 text-purple-500">
                  Feb
                </option>
                <option value="jan" className="p-1 text-purple-500">
                  Jan
                </option>
                <option value="mar" className="p-1 text-purple-500">
                  Mar
                </option>
                <option value="apr" className="p-1 text-purple-500">
                  Apr
                </option>
                <option value="may" className="p-1 text-purple-500">
                  May
                </option>
                <option value="jun" className="p-1 text-purple-500">
                  Jun
                </option>
                <option value="jul" className="p-1 text-purple-500">
                  Jul
                </option>
                <option value="aug" className="p-1 text-purple-500">
                  Aug
                </option>
                <option value="sep" className="p-1 text-purple-500">
                  Sep
                </option>
                <option value="oct" className="p-1 text-purple-500">
                  Oct
                </option>
                <option value="nov" className="p-1 text-purple-500">
                  Nov
                </option>
                <option value="dec" className="p-1 text-purple-500">
                  Dec
                </option>
              </select>
            </div>
            <div className="mb-2">
              <label className="font-semibold mr-2" htmlFor="year">
                Choose Year:
              </label>
              <input
                type="number"
                name="year"
                id="year"
                placeholder="Enter Year"
                className="p-1 ml-4 border-2 rounded text-gray-800 border-gray-800"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
           
          </div>

          {/* Room details : */}
          <div className="flex text-center justify-center items-center font-semibold mx-auto w-full sm:max-w-lg border-2 shadow-md border-gray-500 p-3 rounded-xl">
            <div>
              <div className="mb-1">
                Site name: &nbsp;&nbsp;
                {/* <span className="font-normal">{"John Doe"}</span>  */}
                <input
                  type="text"
                  name="site_name"
                  id="site_name"
                  disabled={!edit}
                  className={`mx-1 ${
                    edit ? "border-2 border-gray-700" : "text-center"
                  } text-gray-900 p-0.5 rounded`}
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                />
              </div>
            
              <div className="mb-1">
                Site location:
                {/* <span className="font-normal">{"Khopoli"}</span> */}
                <input
                  type="text"
                  name="site_location"
                  id="site_location"
                  disabled={!edit}
                  className={`mx-1 ${
                    edit ? "border-2 border-gray-700" : "text-center"
                  } text-gray-900 p-0.5 rounded`}
                  value={siteLocation}
                  onChange={(e) => setSiteLocation(e.target.value)}
                />
              </div>
              <button
                className="mt-2 text-center shadow-lg md:w-auto md:mx-0  bg-purple-500 hover:bg-gray-600 transition duration-50 delay-100 hover:delay-100 text-white px-4 py-2 rounded-lg"
                onClick={() => setEdit(!edit)}
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
        <button className="flex justify-center items-center gap-x-2 gap-y-1 text-center shadow-lg md:w-auto md:mx-0  bg-purple-500 hover:bg-gray-600 transition duration-50 delay-100 hover:delay-100 text-white px-5 py-3 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            />
          </svg>
          <div>Get All Time Site Details</div>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <SiteDetails />
          <SiteDetails />
          <SiteDetails />
          
          <SiteDetails />
          <SiteDetails />
          <SiteDetails />
          
         

          
        </div>
    </div>
  );
};

export default SingleSiteExpenseCard;
