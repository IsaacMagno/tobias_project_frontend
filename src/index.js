import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-oldschool-dark";
import store from "./Redux/store";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const options = {
  position: positions.TOP_CENTER,
  timeout: 2000,
  offset: "10px",
  transition: transitions.scale,
};

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </Provider>
  </BrowserRouter>
);
