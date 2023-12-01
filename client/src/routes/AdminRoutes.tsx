import React from 'react';
import Sidebar from '../elements/Sidebar/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard';
import AdminAgents from '../pages/AdminAgents/AdminAgents';
import AdminAgentDetails from '../pages/AdminAgentDetails/AdminAgentDetails';
import AdminUsers from '../pages/AdminUsers/AdminUsers';
import AdminUserDetails from '../pages/AdminUserDetails/AdminUserDetails';
import AdminRepas from '../pages/AdminRepas/AdminRepas';

const AdminRoutes = () => {
    return (
            <div className="admin_routes">
                <Sidebar /> 
                <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="repas-du-jour" element={<AdminRepas />} />
                    <Route path="agents" element={<AdminAgents />} />
                    <Route path="agents/:id" element={<AdminAgentDetails />} />
                    <Route path="repas" element={<AdminAgentDetails />} />
                    <Route path="entites" element={<AdminAgentDetails />} />
                    <Route path="departements" element={<AdminAgentDetails />} />
                    <Route path="parametres" element={<AdminAgentDetails />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="users/:id" element={<AdminUserDetails />} />
                    <Route path="*" element={<Navigate to="/admin" />} />
                </Routes>
            </div>
    )
}
export default AdminRoutes;