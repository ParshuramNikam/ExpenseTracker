import React, { useState } from "react";
import BussinessExpenseCard from "../components/BussinessExpenseCard";
import ExpenseCard from "../components/ExpenseCard";
import PersonalExpenseCard from "../components/PersonalExpenseCard";

const BussinessExpenses = ({ user }) => {
  let [isOpen, setIsOpen] = useState(false);

  function onCloseModal() {
    setIsOpen(false);
  }

  function onOpenModal() {
    setIsOpen(true);
  }

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
            <p className="text-base md:text-lg ">Add New Site</p>
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
            ADD SITE DETAILS
          </h3>
          <input
            type="text"
            name="site_name"
            id="site_name"
            placeholder="Site Name"
            className="mt-4 w-full border-2 rounded-3xl p-1 pl-4 outline-none placeholder-black  border-gray-400"
          />
          <input
            type="text"
            name="site_location"
            id="site_location"
            placeholder="Site Location"
            className="mt-4 w-full border-2 rounded-3xl p-1 pl-4 outline-none placeholder-black  border-gray-400"
          />

          <div className="flex flex-col">
            <button
              type="button"
              onClick={() => alert("Code required!")}
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

    <div className="flex flex-col sm:flex-row">
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
            <div className="font-medium text-xl text-purple-500">
              Total Expenses
            </div>
            <div className="flex self-center text-2xl font-semibold">
              &#8377; 20,000
            </div>
          </div>
        </div>
      </div>
      
    </div>

    <div className="px-4 mb-3">
      <div className="border-b mb-2 border-b-gray-500 h-0 "></div>
    </div>

    <div className="grid grid-cols-2  xl:grid-cols-4">
    <BussinessExpenseCard />
    <BussinessExpenseCard />
    <BussinessExpenseCard />

    <BussinessExpenseCard />
    <BussinessExpenseCard />
    <BussinessExpenseCard />

    <BussinessExpenseCard />
    <BussinessExpenseCard />
    <BussinessExpenseCard />

    <BussinessExpenseCard />
    <BussinessExpenseCard />
    <BussinessExpenseCard />
    </div>
  </div>
  );
};

export default BussinessExpenses;
