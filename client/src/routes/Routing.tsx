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
import { useUserContext } from '../helpers/UserContext';

const Routing: React.FC = () => {

    const { userProfile } = useUserContext();
    const isUserLoggedIn = userProfile !== undefined;

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/*" element={<AdminRoutes />}/>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};



export default Routing;
