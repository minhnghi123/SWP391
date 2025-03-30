import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Unauthorized from '../pages/unauthorizedPage'; 

const PrivateRoute = () => {
    const user = useSelector(state => state.account.user);
    const location = useLocation();

    // If no user, redirect to login
    if (!user) {
        return <Navigate to="/loginPage" state={{ from: location }} replace />;
    }

    const roleAccount = user?.role?.toLowerCase() || '';

    // Define role-based route restrictions
    const restrictedRoutes = {
        user: [
            '/staffPage',
            '/dashboardPage',
        ],
        staff: [
            '/dashboardPage',
        ],
        admin: [], // Admin has full access
    };

   
    const isRestricted = restrictedRoutes[roleAccount]?.some(restrictedPath =>
        location.pathname.toLowerCase().includes(restrictedPath.toLowerCase())
    );

    if (isRestricted) {
        return <Unauthorized />;
    }


    return <Outlet />;
};

export default PrivateRoute;