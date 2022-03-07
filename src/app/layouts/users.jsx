import React from "react";
import { useParams, Redirect } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage";
// import UserProvider from "../hooks/useUsers";
// import { useAuth } from "../hooks/useAuth";
import { getCurrentUserId } from "../store/users";
import UsersLoader from "../components/ui/hoc/usersLoader";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    // const { currentUser } = useAuth();
    const currentUserId = useSelector(getCurrentUserId());
    // const dataStatus = useSelector(getDataStatus());
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     if (!dataStatus) dispatch(loadUsersList());
    // }, []);
    // if (!dataStatus) return "Loading...";
    return (
        <>
            <UsersLoader>
                {/* <UserProvider> */}
                {userId ? (
                    edit ? (userId === currentUserId ?
                        <EditUserPage /> : <Redirect to={`/users/${currentUserId}/edit`}/>
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
                {/* </UserProvider> */}
            </UsersLoader>
        </>
    );
};

export default Users;
