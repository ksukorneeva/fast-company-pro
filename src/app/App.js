import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Users from "./layouts/users";
import MainPage from "./layouts/mainPage";
import Login from "./layouts/login";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";
import LoginProvider from "./hooks/useLogin";

function App() {
    return (
        <BrowserRouter>
            <div>
                <AuthProvider>
                    <LoginProvider>
                        <NavBar />
                        <ProfessionProvider>
                            <QualityProvider>
                                <Switch>
                                    <Route path="/users/:userId?/:edit?" component={Users} />
                                    <Route path="/login/:type?" component={Login} />
                                    <Route path="/" exact component={MainPage} />
                                    <Redirect to="/" />
                                </Switch>
                            </QualityProvider>
                        </ProfessionProvider>
                    </LoginProvider>
                </AuthProvider>
                <ToastContainer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
