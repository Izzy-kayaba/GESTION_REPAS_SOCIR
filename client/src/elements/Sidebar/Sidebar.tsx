import React from 'react';
import "./Sidebar.css"
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const customClassName = ({ isActive }: { isActive: boolean }) =>
        isActive ? 'link_nav active' : 'link_nav';

    return (
        <nav>
            <h2 className="titre-menu">Administration</h2>
            <ul>
                <NavLink className={customClassName} to="/admin">
                    TABLEAU DE BORD
                </NavLink>
                <NavLink className={customClassName} to="/daily-meal">
                    Repas du jour
                </NavLink>
                <NavLink className={customClassName} to="/admin/agents">
                    Agents
                </NavLink>
                <NavLink className={customClassName} to="/admin/meals">
                    Repas
                </NavLink>
                <NavLink className={customClassName} to="/admin/entities">
                    Entites
                </NavLink>
                <NavLink className={customClassName} to="/admin/departments">
                    Departements
                </NavLink>
                <NavLink className={customClassName} to="/admin/settings">
                    Parametres
                </NavLink>
            </ul>
        </nav >
    );
};

export default Sidebar;

