import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { store } from "../index";
import { Navigate } from "react-router";
import axios from "axios";
import emailjs from "emailjs-com";

const Home = () => {
  const context = useContext(store);
  const [data, setData] = useState(null);
  const [token, SetToken] = context;
  const [form_data, setform_data] = useState({
    subject: "",
    user_email: "",
    message: "",
  });

  if (!context) {
    console.log(
      "Context is undefined. Ensure the provider is wrapped around this component."
    );
    return <div>Error: Context is not available!</div>;
  }

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:4000/v1/profile", {
          headers: {
            "x-token": token,
          },
        })
        .then((res) => {
          setData(res.data);
          console.log(res.data.message); // Handle the response data as needed
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleChange = (e) => {
    setform_data({ ...form_data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_1ucj7ms",
        "template_gn1tso5",
        form_data,
        "YgRlGfr5byoi2MjAE"
      )
      .then(
        () => {
          console.log("Email sent!");
          setform_data({
            subject: "",
            user_email: "",
            message: "",
          });
        },
        (err) => {
          console.error("Failed to send email:", err);
        }
      );
    setform_data({
      subject: "",
      user_email: "",
      message: "",
    });
  };

  return (
    <div>
      <Navbar />
      <p>{data ? `Hello, ${data?.message?.username}` : "Loading data..."}</p>
      <form onSubmit={handleSubmit}>
        <label>Subject</label>
        <input
          type="text"
          name="subject"
          value={form_data.subject}
          onChange={handleChange}
        required/>
        <label>Email</label>
        <input
          type="email"
          name="user_email"
          value={form_data.user_email}
          onChange={handleChange}
        required/>
        <label>Message</label>
        <input
          type="text"
          name="message"
          value={form_data.message}
          onChange={handleChange}
        required/>
        <input type="submit" value="Send" className="button" />
      </form>
    </div>
  );
};

export default Home;
