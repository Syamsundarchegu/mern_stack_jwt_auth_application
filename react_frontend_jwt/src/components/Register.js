import React from "react";
import Navbar from "./Navbar";
import "../Register.css";
import { useRef } from "react";
import axios from "axios";

const Registerurl = "http://localhost:4000/v1/register";

const Register = () => {
  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmpassword = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      email.current.value,
      username.current.value,
      password.current.value,
      confirmpassword.current.value
    );

    // Create the data object
    let data = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
      confirmpassword: confirmpassword.current.value,
    };

    // Make the POST request with axios
    axios
      .post(Registerurl, data)
      .then((res) => alert(res.data))
      .catch((err) => console.error("Error:", err));

    // Reset input values
    email.current.value = "";
    username.current.value = "";
    password.current.value = "";
    confirmpassword.current.value = "";
  };

  return (
    <div>
      <Navbar />
      <div
        className="outer"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <form onSubmit={handleSubmit}>
          <label>
            Username
            <input type="text" ref={username} />
          </label>
          <br />
          <label>
            Email
            <input type="email" ref={email} />
          </label>
          <br />

          <label>
            Password
            <input type="password" ref={password} />
          </label>
          <br />

          <label>
            Confirm Password
            <input type="password" ref={confirmpassword} />
          </label>
          <br />

          <input type="submit" className="button" />
        </form>
      </div>
    </div>
  );
};

export default Register;
