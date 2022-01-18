import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Users from "./layouts/users";
import MainPage from "./layouts/mainPage";
import Login from "./layouts/login";
import EditPage from "./components/common/editPage";

function App() {
    return (
        <BrowserRouter>
            <div>
                <NavBar />
                <Switch>
                    <Route path="/" exact component={MainPage} />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/users/:userId/edit" component={EditPage} />
                    <Route path="/users/:userId" component={Users} />
                    <Route path="/users" exact component={Users} />
                    <Redirect to="/" />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
