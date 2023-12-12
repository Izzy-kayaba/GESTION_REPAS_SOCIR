import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Registration from '../pages/Registration/Registration';
import AdminParametres from '../pages/AdminParametres/AdminParametres';
import Profile from '../pages/Profile/Profile';

const SettingsRoutes = () => {
    return (
        <div className="settings_routes">
            <div>Settings</div>
                <Routes>
                    {[
                        <Route key="parametres" path="/" element={<AdminParametres/>} />,
                        <Route key="profile" path="profile" element={<Profile />} />,
                        <Route key="utilisateurs" path="utilisateurs" element={<Registration />} />,
                        <Route key="not-found" path="*" element={<Navigate to="/parametres" />} />,
                    ]}
                </Routes>
        </div>
    )
}
export default SettingsRoutes;
