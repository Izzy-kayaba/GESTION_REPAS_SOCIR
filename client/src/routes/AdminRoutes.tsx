import React from 'react';
import Sidebar from '../elements/Sidebar/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard';
import AdminAgents from '../pages/AdminAgents/AdminAgents';
import AdminAgentDetails from '../pages/AdminAgentDetails/AdminAgentDetails';
import AdminUsers from '../pages/AdminUsers/AdminUsers';
import AdminUserDetails from '../pages/AdminUserDetails/AdminUserDetails';

const AdminRoutes = () => {
    return (
            <div className="admin_routes">
                <Sidebar />
                <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="agents" element={<AdminAgents />} />
                    <Route path="agents/:id" element={<AdminAgentDetails />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="users/:id" element={<AdminUserDetails />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
    )
}

export default AdminRoutes;