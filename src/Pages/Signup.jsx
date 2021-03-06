import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../database/firebase.config.js";

const Signup = ({ setIsUserLoggedIn }) => {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState(""); // for confirm password

    const registerNewUser = (e) => {

        e.preventDefault();

        setLoading(true);

        if (!password || !emailId || !cpassword || !username) {
            alert("All fields required!");
        } else if (password !== cpassword) {
            alert("Password and confirm-password not matched!");
        } else if (password.length < 6) {
            alert("Password should be at least 6 characters");
        } else {
            auth.createUserWithEmailAndPassword(emailId, password).then((user) => {
                var currentUser = auth.currentUser;
                currentUser.updateProfile({
                    displayName: username
                })
            }).then(() => {
                auth.signOut().then(() => {
                    console.log("Signout Successful");
                    setIsUserLoggedIn(false)
                }).then(() => {
                    console.log("Done.... User registred succesfully");
                    console.log("Signup succesful! & Logout succesful");
                }).catch((error) => {
                    console.log(error.message);
                });

                // redirect to login page:
                navigate('/login');

            }).catch((error) => {
                alert(error.message);
            });
        }

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    return (
        <div className="h-screen flex">
            <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center">
                <div>
                    <div className="text-white flex flex-col items-center justify-start gap-3  lg:mb-5">
                        <img src='/images/icon.png' className='w-20 h-20' />
                        <p className="text-4xl lg:text-5xl font-bold leading-4 text-white">Expense Tracker</p>
                    </div>
                    {/* <h1 className="text-white font-bold text-4xl font-sans">Expense Tracker</h1> */}
                    <p className="text-yellow-300 text-base font-normal mt-5 lg:mt-2">Manage Business Expenses Anywhere in Real-Time</p>
                </div>
            </div>
            <div className="flex w-full md:w-1/2 justify-center items-center bg-white">
                <form className="bg-white">
                    <p className="text-center text-3xl  text-bold text-indigo-700 mb-2">Sign up</p>
                    <p className="text-center text-sm text-semibold text-gray-700 mb-6">Create Your Account</p>
                    {/* <h1 className="text-indigo-800 font-bold text-2xl mb-5 text-center">Login</h1> */}
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <input className="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Your name"
                            value={username} onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input className="pl-2 outline-none border-none" type="email" name="" id="" placeholder="Email Address"
                            value={emailId} onChange={(e) => setEmailId(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <input className="pl-2 outline-none border-none" type="password" name="" id="" placeholder="Password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <input className="pl-2 outline-none border-none" type="password" name="" id="" placeholder="Confirm Password"
                            value={cpassword} onChange={(e) => setCpassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                        onClick={registerNewUser}
                    >
                        <div className="flex justify-center items-center">
                            {
                                loading ? <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg> : ""
                            }
                            <div>Signup</div>
                        </div>
                    </button>
                    <br />
                    <div className="text-sm text-center">
                        Already have a account!&nbsp;
                        <span className="text-indigo-700"><Link to={'/login'}>Login here</Link></span>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default Signup