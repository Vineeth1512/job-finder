import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Config/firebaseConfig";
import { useNavigate } from "react-router-dom";


const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotBtn = async (e) => {
    e.preventDefault();
    console.log(email);

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("If the email exists, you will receive a password reset link.");
      setEmail("");
     setTimeout(()=> navigate("/login"),2000)
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Reset Password</h2>
      <Form onSubmit={handleForgotBtn} className="signup-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default ForgetPassword;
