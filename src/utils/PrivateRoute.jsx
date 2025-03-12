import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PrivateRoute = () => {
    const user = useSelector(state => state.account.user);
    if (!user) {
        return <Navigate to="/loginPage" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
