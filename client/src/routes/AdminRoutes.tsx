import React from 'react';
import Sidebar from '../elements/Sidebar/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard';
import AdminAgents from '../pages/AdminAgents/AdminAgents';
import AdminEntites from '../pages/AdminEntites/AdminEntites';
import AdminDepartements from '../pages/AdminDepartements/AdminDepartements';
import AdminParametres from '../pages/AdminParametres/AdminParametres';
import AdminAgentDetails from '../pages/AdminAgentDetails/AdminAgentDetails';
import AdminUsers from '../pages/AdminUsers/AdminUsers';
import AdminUserDetails from '../pages/AdminUserDetails/AdminUserDetails';
import Main from '../elements/Main/Main';
import AdminRepas from '../pages/AdminRepas/AdminRepas';
import Registration from '../pages/Registration/Registration';

const AdminRoutes = () => {
    return (
        <div className="admin_routes">
            <Sidebar />
            <Main>
                <Routes>
                    {[
                        <Route key="dashboard" path="/" element={<AdminDashboard />} />,
                        <Route key="repas-du-jour" path="repas-du-jour" element={<AdminRepas />} />,
                        <Route key="agents" path="agents" element={<AdminAgents />} />,
                        <Route key="agent-details" path="agents/:id" element={<AdminAgentDetails />} />,
                        <Route key="repas" path="repas" element={<AdminRepas />} />,
                        <Route key="entites" path="entites" element={<AdminEntites />} />,
                        <Route key="departements" path="departements" element={<AdminDepartements />} />,
                        <Route key="parametres/*" path="parametres" element={<AdminParametres />} />,
                        <Route key="users" path="users" element={<AdminUsers />} />,
                        <Route key="user-details" path="users/:id" element={<AdminUserDetails />} />,
                        <Route key="not-found" path="*" element={<Navigate to="/admin" />} />,
                    ]}
                </Routes>
            </Main>

        </div>
    )
}
export default AdminRoutes;