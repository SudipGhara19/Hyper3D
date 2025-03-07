import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/userSlice.js";
import { removeFoldersData } from "../redux/folderSlice.js";

const PrivateRoute = () => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const tokenData = JSON.parse(localStorage.getItem("access_token"));

    const isTokenValid = tokenData && tokenData.token && tokenData.expiryTime > Date.now();

    if (!isTokenValid || !currentUser) {
        localStorage.removeItem("access_token");
        dispatch(signOut());
        dispatch(removeFoldersData());

        return <Navigate to="/signin" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
