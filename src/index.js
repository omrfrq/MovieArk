import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

//import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./index.css";

import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
