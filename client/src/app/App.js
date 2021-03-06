import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Users from "./layouts/users";
import MainPage from "./layouts/mainPage";
import Login from "./layouts/login";
import { ToastContainer } from "react-toastify";
// import { ProfessionProvider } from "./hooks/useProfession";
// import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";
// import { QualitiesProvider } from "./hooks/useQualities";

function App() {
    return (
        <div>
            <AppLoader>
                {/* <AuthProvider> */}
                <NavBar />
                {/* <ProfessionProvider> */}
                {/* <QualitiesProvider> */}
                <Switch>
                    <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/logout" component={LogOut}/>
                    <Route path="/" exact component={MainPage} />
                    <Redirect to="/" />
                </Switch>
                {/* </QualitiesProvider> */}
                {/* </ProfessionProvider> */}
                {/* </AuthProvider> */}
            </AppLoader>
            <ToastContainer/>
        </div>
    );
}

export default App;
