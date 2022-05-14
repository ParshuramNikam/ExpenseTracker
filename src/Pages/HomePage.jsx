import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../database/firebase.config';

const HomePage = ({ isUserLoggedIn }) => {
    const navigate = useNavigate();

    const logoutUser = () => {
        auth.signOut().then(() => {
            console.log("Signout Successful");
            navigate('/login');
        }).catch((error) => {
            console.log(error.message);
        });
    }

    return (
        <div className=' min-h-screen bg-gray-50 '>
            {
                isUserLoggedIn && <div className='h-12 mx-2'>
                    <div>
                        <button className="float-right shadow-2xl flex justify-center items-center gap-1.5 w-max bg-red-500 hover:bg-red-600 text-white rounded-md mt-1.5 px-4 py-2"
                            onClick={logoutUser}
                        >
                            <div className='font-semibold font-sans'>
                                LOGOUT
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            }
            <div className="p-3 lg:flex items-center justify-between">
                <div className="lg:w-1/2 w-full">
                    {/* <p className="text-base leading-4 text-gray-600">Expense Tracker</p> */}
                    {/* <h1 role="heading" className="md:text-5xl text-3xl font-bold leading-10 mt-3 text-gray-800">Expense Tracker</h1> */}
                    <div className="flex flex-col items-center justify-start gap-0  lg:mb-5">
                        <img src='/images/icon.png' className=' w-16 h-16 lg:w-20 lg:h-20 mt-4 ' alt='' />
                        <p className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-4 mt-2 sm:mt-0 text-gray-700">Expense Tracker</p>
                        <p role="contentinfo" className=" text-lg lg:text-2xl leading-7 mt-4 lg:mt-6 text-gray-500 flex text-center">Manage Business Expenses Anywhere in Real-Time.</p>
                    </div>
                </div>
                <div className="xl:w-1/2 lg:w-7/12 relative w-full lg:mt-0 mt-12 md:px-8" role="list">
                    <img src="https://i.ibb.co/0n6DSS3/bgimg.png" className="absolute w-full -ml-12 mt-24" alt="background circle images" />
                    <Link to={'/personal'}>
                        <div role="listitem" className="bg-red-500 cursor-pointer shadow rounded-lg p-8 relative z-30">
                            <div className="md:flex items-center justify-between">
                                <h2 className="text-2xl sm:text-3xl font-semibold leading-6 text-white">Personal Expenses</h2>
                            </div>
                            <p className="md:w-80 text-base sm:text-lg font-normal leading-6 mt-4 text-gray-900">Get your peronal expenses.</p>
                        </div>
                    </Link>
                    <Link to={'/rents'}>
                        <div role="listitem" className="bg-emerald-400 cursor-pointer shadow rounded-lg mt-3 flex relative z-30">
                            <div className="w-full p-8">
                                <div className="md:flex items-center justify-between">
                                    <h2 className="text-2xl sm:text-3xl font-semibold leading-6 text-white">Room Rents</h2>
                                </div>
                                <p className="md:w-80 text-base sm:text-lg font-normal leading-6 mt-4 text-gray-900">Track your all rooms rents.</p>
                            </div>
                        </div>
                    </Link>
                    <Link to={'/bussiness'}>
                        <div role="listitem" className="bg-purple-500 cursor-pointer shadow rounded-lg p-8 relative z-30 mt-3">
                            <div className="md:flex items-center justify-between">
                                <h2 className="text-2xl sm:text-3xl font-semibold leading-6 text-white">Business Expenses</h2>
                            </div>
                            <p className="md:w-80 text-base sm:text-lg font-normal leading-6 mt-4 text-gray-900">Track your business expenses.</p>
                        </div>
                    </Link>
                </div>
            </div >
        </div>
    )
}

export default HomePage