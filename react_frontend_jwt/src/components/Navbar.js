import React from "react";
import { Link } from "react-router-dom";
import "../Navbar.css";
import { store } from "../index";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const Navbar = () => {
  const [token, setToken] = useContext(store);
  function logout() {
    setToken(null);
    return <Navigate to="/login" />;
  }
  return (
    <div className="container">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {token ? (
          <li>
            <Link onClick={logout}>Logout</Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
