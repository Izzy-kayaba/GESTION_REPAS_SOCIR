import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Registration from '../pages/Registration/Registration';
import AdminParametres from '../pages/Configuration/Configuration';
import Profile from '../pages/Profile/Profile';
import Agents from '../pages/Agents/Agents';

const SettingsRoutes = () => {
    return (
        <div className="settings_routes">
            <div>Settings</div>
            <Routes>
                {[
                    <Route key="configuration" path="/" element={<AdminParametres />} />,
                    <Route key="utilisateurs" path="utilisateurs" element={<Registration />} />,
                    <Route key="profile" path="profile" element={<Profile />} />,
                    <Route key="agents" path="agents" element={<Agents />} />,
                    <Route key="not-found" path="*" element={<Navigate to="/admin/configuration" />} />,
                ]}
            </Routes>
        </div>
    )
}
export default SettingsRoutes;
