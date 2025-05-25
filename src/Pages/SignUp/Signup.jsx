import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../Config/firebaseConfig";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import ShowPassword from "../../Components/ShowPassword/ShowPassword";
const Signup = () => {
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  const handeSignSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted", signup);

    try {
      console.log();
      const createdAccount = await createUserWithEmailAndPassword(
        auth,
        signup.email,
        signup.password
      );
      updateProfile(createdAccount.user,{
        displayName:signup.name
      })
//createdAccount.user.uid
      await setDoc(doc(db, `${signup.role}s`,signup.name ), {
        name: signup.name,
        email: signup.email,
        role: signup.role,
        id: Date.now()
      });
      

      

      toast.success("Signup successfully");
      console.log(createdAccount);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  return (
    <div className="signup-container">
      <h2 className="signup-title">Create Account</h2>
      <Form onSubmit={handeSignSubmit} className="signup-form">
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Name"
            onChange={(e) => setSignup({ ...signup, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setSignup({ ...signup, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          {/* ShoW Passoword is Component */}
          <ShowPassword 
          value={signup.password}
          onChange={(e)=>setSignup({...signup ,password:e.target.value})}
          />
        </Form.Group>

      <Form.Group>
        <Form.Label>Role</Form.Label>
         <Form.Select
          aria-label="Default select example"
          onChange={(e) => setSignup({ ...signup, role: e.target.value })}
        >
          <option>Choose the Role</option>
          <option value="recruiter">Recruiter</option>
          <option value="jobseeker">JobSeeker</option>
        </Form.Select>
      </Form.Group>
       
        <Button variant="primary" type="submit" className="w-100">
          Sign Up
        </Button>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
