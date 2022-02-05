import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Users from "./layouts/users";
import MainPage from "./layouts/mainPage";
import Login from "./layouts/login";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQualities";

function App() {
    return (
        <BrowserRouter>
            <div>
                <NavBar />
                <Switch>
                    <ProfessionProvider>
                        <QualityProvider>
                            <Route path="/login/:type?" component={Login} />
                            <Route path="/users/:userId?/:edit?" component={Users} />
                        </QualityProvider>
                    </ProfessionProvider>
                    <Route path="/" exact component={MainPage} />
                    <Redirect to="/" />
                </Switch>
                <ToastContainer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
