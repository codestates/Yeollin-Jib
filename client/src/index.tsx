import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
// socket client
// import Socket from "./network/socket";
// import ChatService from "./network/chatting";

// const baseURL = process.env.REACT_APP_API_URL!;
// const accessToken = "";
// const socketClient: Socket = new Socket(baseURL, accessToken);
// const Service = new ChatService(httpClient, accessToken, socketClient);

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
