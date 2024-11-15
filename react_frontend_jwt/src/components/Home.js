import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { store } from "../index";
import { Navigate } from "react-router";
import axios from "axios";

const Home = () => {
  const context = useContext(store);
  const [data, setData] = useState(null);
  const [token, SetToken] = context;
  // If context is not available, return an error or fallback
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

  return (
    <div>
      <Navbar />
      <h1>Welcome to Home</h1>
      <p>{data ? `Hello, ${data.message.username}` : "Loading data..."}</p>
    </div>
  );
};

export default Home;
