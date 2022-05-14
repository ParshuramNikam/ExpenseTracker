import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SiteDetails from "../components/SiteDetails";
import { db } from "../database/firebase.config";
import MonthArray from "../utils/MonthArray";

const SingleSiteExpenseCard = ({ fetchDataByFilter, month, setMonth, year, setYear, day, setDay, loading, setLoading, user, refreshData, siteDetails, setSiteDetails, allExpenseDetails, setAllExpenseDetails, setExpenseDetails, expenseDetails }) => {


  const [siteName, setSiteName] = useState(siteDetails.name);
  const [siteLocation, setSiteLocation] = useState(siteDetails.location);

  const [edit, setEdit] = useState(false);

  const { siteId } = useParams();

  const updateSiteDetails = () => {
    setEdit(!edit)
    console.log(siteId);

    db.collection('BusinessDetails').doc(siteDetails.docId).update({
      name: siteName,
      location: siteLocation
    }).then(() => {
      console.log("updated succesfully site details")
      setSiteDetails({ ...siteDetails, name: siteName, location: siteLocation })
    }).catch((err) => console.log(err.message))
  }

  const getAllSitesDetails = () => {
    setLoading(true);
    db.collection('BusinessExpense').where("siteId", '==', siteId).get().then(snapshot => {
      setExpenseDetails([])
      setAllExpenseDetails([])
      snapshot.docs.forEach(doc => {
        console.log(">>>>", doc.data());
        setExpenseDetails((prevArr) => [
          ...prevArr,
          { docId: doc.id, details: doc.data() },
        ]);
      })

    }).then(() => {
      console.log("******************");
      console.log(expenseDetails);
      console.log("******************");
      setLoading(false);
      setAllExpenseDetails(expenseDetails)
    }).catch(err => {
      console.log(err.message);
      setLoading(false)
    })
  }

  useEffect(() => {

    setSiteName(siteDetails.name);
    setSiteLocation(siteDetails.location);

    getAllSitesDetails();

  }, [siteId, refreshData, siteDetails]);

  return (
    <div>
      <div className="mx-2">
        <div className="max-w-5xl mx-auto mb-4 mt-3 gap-2 grid grid-cols-1 md:grid-cols-2">
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
              <button className="text-right shadow-lg md:w-auto md:mx-0  bg-purple-500 hover:bg-gray-600 transition duration-50 delay-100 hover:delay-100 text-white px-4 py-2 rounded-lg"
                onClick={fetchDataByFilter}
              >
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
                  className={`mx-1 ${edit ? "border-2 border-gray-700" : "text-center"
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
                  className={`mx-1 ${edit ? "border-2 border-gray-700" : "text-center"
                    } text-gray-900 p-0.5 rounded`}
                  value={siteLocation}
                  onChange={(e) => setSiteLocation(e.target.value)}
                />
              </div>
              <button
                className="mt-2 text-center shadow-lg md:w-auto md:mx-0  bg-purple-500 hover:bg-gray-600 transition duration-50 delay-100 hover:delay-100 text-white px-4 py-2 rounded-lg"
                onClick={updateSiteDetails}
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
        <button className="flex justify-center items-center gap-x-2 gap-y-1 text-center shadow-lg md:w-auto md:mx-0  bg-purple-500 hover:bg-gray-600 transition duration-50 delay-100 hover:delay-100 text-white px-5 py-3 rounded-lg"
          onClick={getAllSitesDetails}
        >
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
        {
          !loading && expenseDetails.map((data, index) =>
            <SiteDetails getAllSitesDetails={getAllSitesDetails} key={index} data={data} />

          )
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
        !loading && expenseDetails.length === 0 && <div className="text-2xl text-center font-bold text-red-600">
          NO EXPENSE RECORD
        </div>
      }
    </div>
  );
};

export default SingleSiteExpenseCard;
