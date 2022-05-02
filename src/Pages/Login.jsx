import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div class="h-screen flex">
            <div class="hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center">
            <div>
                    <div className="text-white flex flex-col items-center justify-start gap-3  lg:mb-5">
                        <img src='/images/icon.png' className='w-20 h-20' />
                        <p className="text-4xl lg:text-5xl font-bold leading-4 text-white">Expense Tracker</p>
                    </div>
                    {/* <h1 class="text-white font-bold text-4xl font-sans">Expense Tracker</h1> */}
                    <p class="text-yellow-300 text-base font-normal mt-5 lg:mt-2">Manage Business Expenses Anywhere in Real-Time</p>
                </div>
            </div>
            <div class="flex w-full md:w-1/2 justify-center items-center bg-white">
                <form class="bg-white">
                <p class="text-center text-3xl  text-bold text-indigo-700 mb-2">Welcome back!</p>
                    <p class="text-center text-sm text-semibold text-gray-700 mb-6">Login to Your Account</p>
                    {/* <h1 class="text-indigo-800 font-bold text-2xl mb-5 text-center">Login</h1> */}
                    <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Email Address"
                            value={emailId} onChange={(e) => setEmailId(e.target.value)}
                        />
                    </div>
                    <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                        </svg>
                        <input class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
                    <div class="text-sm ml-2 hover:text-blue-500 cursor-pointer text-center">Forgot Password ?</div>
                    <br />
                    <div className="text-sm text-center">
                        Don't have a account!&nbsp;
                        <span className="text-indigo-700"><Link to={'/signup'}>Signup here</Link></span>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default Login