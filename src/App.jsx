import React from 'react'
import Navbarr from './Components/Navbar/Navbarr'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Signup from './Pages/SignUp/Signup'
import JobseekerDashboard from './Components/Dashboard/JobseekerDashboard'
import RecruiterDashboard from './Components/Dashboard/RecruiterDashboard'
import ForgetPassword from './Pages/Login/ForgetPassword'
import Home from './Components/Home/Home'

const App = () => {
  return (
   <>
   <Navbarr/>

   <Routes>
    <Route path="/login" element={<Login/>} />
    <Route path="/forgotPassword" element={<ForgetPassword/>} />
    <Route path="/signup" element={<Signup/>} />
    <Route path='/' element={<Home/>}/>
    <Route path="/recruiterDashboard" element={<RecruiterDashboard/>} />
    <Route path="/jobseekerDashboard" element={<JobseekerDashboard/>} />
   </Routes>
   </>
  )
}

export default App