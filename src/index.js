import React from "react";

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { store } from "../src/redux/store";
import { Provider } from "react-redux";
import { StyledEngineProvider } from "@mui/material/styles";

import App from "./App";
import "./styles/_global.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StyledEngineProvider injectFirst>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StyledEngineProvider>
);
