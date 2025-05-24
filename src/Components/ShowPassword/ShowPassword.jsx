import React, { useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { Form } from "react-bootstrap";

const ShowPassword = ({
  value,
  onChange,
  placeholder = "Password",
  controlId = "Password",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div style={{ position: "relative" }}>
        <Form.Control
          controlId={controlId}
          value={value}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          onChange={onChange}
        />

        <span
          onClick={() => setShowPassword((pre) => !pre)}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            userSelect: "none",
            fontSize: "1.2rem",
          }}
        >
          {showPassword ? <FaRegEye /> : <FaEyeSlash />}
        </span>
      </div>
    </>
  );
};

export default ShowPassword;
