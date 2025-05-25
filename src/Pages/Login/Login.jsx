import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
//import { doc, getDoc } from "firebase/firestore";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Config/firebaseConfig";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import ShowPassword from "../../Components/ShowPassword/ShowPassword";
const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handeLoginSubmit = async (e) => {
    const { email, password, role } = login;
    e.preventDefault();
    console.log("submitted", login);

    try {
      const loggedInUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(loggedInUser);

      if (role === "recruiter") {
        localStorage.setItem("loggedInRecruiter" , JSON.stringify(loggedInUser));
      } else {
        localStorage.setItem("loggedInJobseeker", JSON.stringify(loggedInUser));
      }
      navigate(`/${role}Dashboard`);

      // const userDoc = await getDoc(doc(db, "users", loggedInUser.user.uid));
      // const userData = userDoc.data();

      // if (userData && userData.role) {

      // }else {
      //   toast.error("Role not found. Contact admin.");
      // }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  return (
    <div className="signup-container">
      <h2 className="signup-title">Login</h2>
      <Form onSubmit={handeLoginSubmit} className="signup-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <ShowPassword
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Role</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setLogin({ ...login, role: e.target.value })}
          >
            <option>Choose the Role</option>
            <option value="recruiter">Recruiter</option>
            <option value="jobseeker">JobSeeker</option>
          </Form.Select>
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
