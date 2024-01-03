import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard';
import Main from '../components/Main/Main';
import SettingsRoutes from './SettingsRoutes';
import AdminParticipants from '../pages/AdminParticipants/AdminParticipants';
import AdminRepas from '../pages/AdminRepas/AdminRepas';
import AdminAudit from '../pages/AdminAudit/AdminAudit';
import Agents from '../pages/Agents/Agents';

const AdminRoutes = () => {
    return (
        <div className="admin_routes">
            <Sidebar />
            <Main>
                <Routes>
                    {[
                        <Route key="dashboard" path="/" element={<AdminDashboard />} />,
                        <Route key="repas-du-jour" path="repas-du-jour" element={<AdminRepas />} />,
                        <Route key="ajouter-participant" path="ajouter-participant" element={<Agents />} />,
                        <Route key="audit" path="audit" element={<AdminAudit />} />,
                        <Route key="configuration" path="configuration/*" element={<SettingsRoutes />} />,
                        <Route key="not-found" path="*" element={<Navigate to="/admin" />} />,
                    ]}
                </Routes>
            </Main>

        </div>
    )
}
export default AdminRoutes;