import React, {useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import "./styles.scss";
import LoginForm from "./components/LoginForm.tsx";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";

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
/*
<Switch>
                <PrivateRoute exact path="/friends" component={FriendList}/>
                <Route path="/login" component={Login}/>
                <Route path="/friends_list" component={FriendsList}/>
            </Switch>
 */