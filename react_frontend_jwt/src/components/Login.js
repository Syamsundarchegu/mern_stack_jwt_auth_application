import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import "../Register.css";
import { useRef } from "react";
import axios from "axios";
import { store } from "../index";
import { Navigate } from "react-router-dom";

const url = "http://localhost:4000/v1/login";

const Login = () => {
  const [token, Settoken] = useContext(store);
  const [data, setData] = useState({ email: "", password: "" });
  const changehandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(e.target.name);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(url, data);
      console.log(res.data);
      Settoken(res.data.message);
    } catch (error) {
      console.error("Error:", error);
    }
    setData({ email: "", password: "" });
  };
  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Navbar />
      <div
        className="outer"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" name="email" onChange={changehandler} />
          </label>
          <br />

          <label>
            Password
            <input type="password" name="password" onChange={changehandler} />
          </label>
          <br />

          <input type="submit" className="button" />
        </form>
      </div>
    </div>
  );
};

export default Login;
