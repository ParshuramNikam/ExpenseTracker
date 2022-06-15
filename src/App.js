import { useContext, useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './Pages/HomePage';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import BussinessExpenses from './Pages/BussinessExpenses';
import PersonalExpenses from './Pages/PersonalExpenses';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import RentsExpenses from './Pages/RentsExpenses';
import SingleRoomAllRentDetails from './Pages/SingleRoomAllRentDetails';
import app, { auth, db } from './database/firebase.config';
import firebase from 'firebase';
import SingleSiteExpenseDetails from './Pages/SingleSiteExpenseDetails';

function App() {

  const [user, setUser] = useState({
    uid: "",
    username: "",
    email: ""
  })

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // console.log(localStorage.getItem('expense-tracker-user-id'));
    auth.onAuthStateChanged(function (currentUser) {
      if (currentUser) {
        console.log(">>>>> ", currentUser);
        console.log("logged in currentUser id :", currentUser.uid);
        setUser({
          uid: currentUser.uid,
          username: currentUser.displayName,
          email: currentUser.email
        })
        setIsUserLoggedIn(true);
      } else {
        console.log("<<<<< User is signed out.");

        auth.signOut().then(() => {
          console.log("Signout Successful");
          navigate('/login');
          setIsUserLoggedIn(false);
        }).catch((error) => {
          console.log(error.message);
        });
      }
    });

    // if (user.uid) {
    //   db.collection('Users').doc().set({
    //     addedBy: user.uid,
    //     expenseTitle: "My Expense",
    //     expenseAmount: 5000,
    //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    //     timestamp: `${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}`
    //   })
    //     .then(() => {
    //       console.log("Document successfully written!");
    //     })
    //     .catch((error) => {
    //       console.error("Error writing document: ", error);
    //     });
    // }

  }, [])


  return (
    <Routes>
      <Route path="/" exact element={<HomePage isUserLoggedIn={isUserLoggedIn} />} />
      <Route path="/login" exact element={<Login isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn} />} />
      <Route path="/signup" exact element={<Signup isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn} />} />
      <Route path="personal" exact element={<PersonalExpenses user={user} />} />
      <Route path="bussiness" exact element={<BussinessExpenses user={user} />} />
      <Route path="sites/:siteId" exact element={<SingleSiteExpenseDetails user={user} />} />
      <Route path="rents" exact element={<RentsExpenses user={user} />} />
      <Route path="rents/:roomId" exact element={<SingleRoomAllRentDetails user={user} />} />
    </Routes>
  );
}

export default App;
