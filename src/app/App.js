import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import Users from "./components/users";
import MainPage from "./components/mainPage";
import Login from "./components/login";
import Person from "./components/person";
import NotFound from "./components/not-found";

function App() {
    return (
        <BrowserRouter>
            <div>
                <NavBar />
                <Switch>
                    <Route path="/" exact component={MainPage} />
                    <Route path="/404" component={NotFound} />
                    <Route path="/login" component={Login} />
                    <Route path="/users/:userId" component={Person} />
                    <Route path="/users" exact component={Users} />
                    <Redirect to="/404" />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
