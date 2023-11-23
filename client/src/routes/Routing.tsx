import React from 'react';
import {
    Route,
    Routes,
    Navigate,
    Outlet,
} from 'react-router-dom';

// Components for different pages
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import NotFound from '../pages/NotFound/NotFound';
import AdminRoutes from '../routes/AdminRoutes'

const Routing: React.FC = () => {
    return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/admin/*" element={<AdminRoutes />} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
    );
};



export default Routing;
