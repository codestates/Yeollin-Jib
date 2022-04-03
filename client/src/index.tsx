import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import socket from "socket.io-client";

const baseURL = process.env.REACT_APP_API_URL!;
const soketIO = socket(baseURL);
soketIO.on("connect_error", (error) => {
  console.log("socket error", error);
});
soketIO.on("connection", (message) => {
  console.log("socket message", message);
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
