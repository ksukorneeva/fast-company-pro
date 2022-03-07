import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggetIn, getUsersLoadingStatus, loadUsersList } from "../../../store/users";
import { loadQualitiesList } from "../../../store/qualities";
import { loadProfessionsList } from "../../../store/professions";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggetIn = useSelector(getIsLoggetIn());
    const usersStatusLoading = useSelector(getUsersLoadingStatus());
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
        if (isLoggetIn) {
            dispatch(loadUsersList(loadUsersList));
        }
    }, [isLoggetIn]);
    if (usersStatusLoading) return "Loading...";
    return (children);
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AppLoader;
