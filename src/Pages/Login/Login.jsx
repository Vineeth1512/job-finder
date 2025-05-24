import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Config/firebaseConfig";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import ShowPassword from "../../Components/ShowPassword/ShowPassword";
const Login = () => {
  const [login, SetLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handeLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted", login);

    try {
      console.log();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        login.email,
        login.password
      );
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      const userData = userDoc.data();

      if (userData && userData.role) {
        
        setTimeout(() => {
          if (userData.role === "recruiter") {
            navigate(`/${userData.role}Dashboard`);
          } else {
            navigate(`/${userData.role}Dashboard`);
          } 
        }, 1500);
      }else {
        toast.error("Role not found. Contact admin.");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  return (
    <div className="signup-container">
      <h2 className="signup-title">Create Account</h2>
      <Form onSubmit={handeLoginSubmit} className="signup-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => SetLogin({ ...login, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
         <ShowPassword value = {login.password}
          onChange={(e) => SetLogin({ ...login, password: e.target.value })}
         />      
        </Form.Group>

       
         <p className="login-link">
          <Link to="/forgotPassword"> Forgot Password</Link>
        </p>

        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>

        <p className="login-link">
          Already register Login here ? <Link to="/signup">SignUp</Link>
        </p>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default Login;
