import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {BubbleProvider} from "./contexts/BubbleContext";
import {BrowserRouter as Router} from "react-router-dom";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <Router>
        <BubbleProvider>
            <App/>
        </BubbleProvider>
    </Router>
    , rootElement);
