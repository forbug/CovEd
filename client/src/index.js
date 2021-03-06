import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import 'pace-js'
import 'pace-js/themes/blue/pace-theme-minimal.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "typeface-roboto";
// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.render(<App />, document.getElementById("root"));

// allows for live updating
module.hot.accept();
