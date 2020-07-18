import React from "react";
import {Route, Switch} from "react-router-dom";

import "./styles.scss";
import LoginForm from "./components/LoginForm.tsx";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";

//todo: personal stretch/want: move all state into context
function App() {
    return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={LoginForm}/>
                    <PrivateRoute exact path={"/bubble"} component={BubblePage}/>
                </Switch>
            </div>
    );
}

export default App;