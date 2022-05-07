import { useContext, useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './Pages/HomePage';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"; import BussinessExpenses from './Pages/BussinessExpenses';
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


  useEffect(() => {
    // console.log(localStorage.getItem('expense-tracker-user-id'));
    auth.onAuthStateChanged(function (currentUser) {
      if (currentUser) {
        console.log(">>>>>>>>>>>>> ", currentUser);
        console.log("logged in currentUser id :", currentUser.uid);

        setUser({
          uid: currentUser.uid,
          username: currentUser.displayName,
          email: currentUser.email
        })
      } else {
        console.log("<<<< User is signed out.");

        auth.signOut().then(() => {
          console.log("Signout Successful");
        }).then(() => {
          console.log("Done.... User registred succesfully");
          alert("Signup succesful! & Logout succesful");
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
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="personal" exact element={<PersonalExpenses user={user} />} />
        <Route path="bussiness" exact element={<BussinessExpenses user={user} />} />
        <Route path="sites/:siteId" exact element={<SingleSiteExpenseDetails user={user} />} />
        <Route path="rents" exact element={<RentsExpenses user={user} />} />
        <Route path="rents/:roomId" exact element={<SingleRoomAllRentDetails user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
