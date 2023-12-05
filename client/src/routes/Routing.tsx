import React, { useState } from 'react';
import {
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';

// Components for different pages
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import NotFound from '../pages/NotFound/NotFound';
import AdminRoutes from '../routes/AdminRoutes'
import { UserProvider } from '../Helpers/UserContext';

const Routing: React.FC = () => {

    const [userProfile, setuserProfile] = useState(null);

    return (
        <UserProvider>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/admin/*" element={<AdminRoutes />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </UserProvider>
    );
};



export default Routing;
