import React from "react";
import Navbarr from "./Components/Navbar/Navbarr";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/SignUp/Signup";
import JobseekerDashboard from "./Components/Dashboard/JobseekerDashboard/JobseekerDashboard";
import RecruiterDashboard from "./Components/Dashboard/RecruiterDashboard/RecruiterDashboard";
import ForgetPassword from "./Pages/Login/ForgetPassword";
import Home from "./Components/Home/Home";
import { PostJob } from "./Components/Dashboard/RecruiterDashboard/PostJob/PostJob";
import { AllJobs } from "./Components/Dashboard/RecruiterDashboard/AllJobs/AllJobs";

const App = () => {
  return (
    <>
      <Navbarr />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgetPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/recruiterDashboard" element={<RecruiterDashboard />}>
          <Route path="postJob" element={<PostJob />} />
          <Route path="allPosts" element={<AllJobs />} />

        </Route>
        <Route path="/jobseekerDashboard" element={<JobseekerDashboard />} />
      </Routes>
    </>
  );
};

export default App;
