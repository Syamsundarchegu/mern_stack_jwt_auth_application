import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

export const store = React.createContext(null);

const RootComponent = () => {
  // Set up state inside a functional component
  const [token, setToken] = useState(null);

  return (
    <React.StrictMode>
      <store.Provider value={[token, setToken]}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </store.Provider>
    </React.StrictMode>
  );
};

root.render(<RootComponent />);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
