import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthContext } from '../components/Context/AuthContext';

const PrivateRoute = () => {
    const user = useSelector(state => state.account.user);
    const { loading } = useContext(AuthContext);

    if (loading) {
        // You can replace this with a loading spinner component
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/loginPage" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
