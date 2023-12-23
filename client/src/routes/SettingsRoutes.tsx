import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Registration from '../pages/Registration/Registration';
import AdminParametres from '../pages/Configuration/Configuration';
import Profile from '../pages/Profile/Profile';
import Agents from '../pages/Agents/Agents';
import AgentsForm from '../pages/Agents/AgentsForm';

const SettingsRoutes = () => {
    return (
        <div className="settings_routes">
            <Routes>
                {[
                    <Route key="configuration" path="/" element={<AdminParametres />} />,
                    <Route key="utilisateurs" path="utilisateurs" element={<Registration />} />,
                    <Route key="profile" path="profile" element={<Profile />} />,
                    <Route key="agents" path="agents" element={<Agents />} />,
                    <Route key="agents" path="agents/:id" element={<AgentsForm />} />,
                    <Route key="not-found" path="*" element={<Navigate to="/admin/configuration" />} />,
                ]}
            </Routes>
        </div>
    )
}
export default SettingsRoutes;
