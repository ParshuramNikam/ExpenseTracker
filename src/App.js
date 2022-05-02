import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './Pages/HomePage';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"; import BussinessExpenses from './Pages/BussinessExpenses';
import Rents from './Pages/Rents';
import PersonalExpenses from './Pages/PersonalExpenses';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
;

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="personal" exact element={<PersonalExpenses />} />
        <Route path="bussiness" exact element={<BussinessExpenses />} />
        <Route path="rents" exact element={<Rents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
