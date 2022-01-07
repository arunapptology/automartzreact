import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import App from "./App";
import { store } from "./store";

import faStyles from "font-awesome/css/font-awesome.css";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import "./index.css";
import "./body.css";
import "./css/responsive.css";
import "./css/sidebar.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
