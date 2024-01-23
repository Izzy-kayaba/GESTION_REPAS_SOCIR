import React from 'react';
import {
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';

// Components for different pages
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound/NotFound';
import AdminRoutes from '../routes/AdminRoutes'
import { useUserContext } from '../helper/UserContext';

const Routing: React.FC = () => {

    const { userProfile }: any = useUserContext();
    const isUserLoggedIn = userProfile !== undefined;

    return (
        <Routes>
            <Route path="/" element={isUserLoggedIn ? <Navigate to="/admin" /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/*" element={isUserLoggedIn ? <AdminRoutes /> : <Navigate to="/login" />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};



export default Routing;
