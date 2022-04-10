import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
// import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { getIsLoggetIn } from "../../store/users";
const ProtectedRoute = ({ component: Component, children, ...rest }) => {
    // const { currentUser } = useAuth();
    const isLoggetIn = useSelector(getIsLoggetIn());
    return (
        <Route { ...rest } render={(props) => {
            if (!isLoggetIn) {
                return <Redirect to = {{
                    pathname: "/login",
                    state: {
                        from: props.location
                    }
                }}/>;
            }
            return Component ? <Component { ...props }/> : children;
        }}/>
    );
};
ProtectedRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default ProtectedRoute;
