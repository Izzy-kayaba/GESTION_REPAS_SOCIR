import React, { useState } from 'react';
import "./Sidebar.css"
import { Button, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";

const Sidebar: React.FC = () => {
    const customClassName = ({ isActive }: { isActive: boolean }) =>
        isActive ? 'link_nav active' : 'link_nav';

    const [arrow, setArrow] = useState<string>("IoMdArrowDropdown");
    const [showParams, setShowParams] = useState<Boolean>(false);
    const handleDrowpDown = () => {
        setShowParams(!showParams);
    }

    return (
        <nav id="sidebar">
            <h2 className="titre-menu">Administration</h2>
            <ul>
                <NavLink className={customClassName} to="/admin">
                    TABLEAU DE BORD
                </NavLink>
                <NavLink className={customClassName} to="/admin/repas-du-jour">
                    Repas du jour
                </NavLink>
                <NavLink className={customClassName} to="/admin/agents">
                    Agents
                </NavLink>
                <NavLink className={customClassName} to="/admin/repas">
                    Repas
                </NavLink>
                <NavLink className={customClassName} to="/admin/entites">
                    Entites
                </NavLink>
                <NavLink className={customClassName} to="/admin/departments">
                    Departements
                </NavLink>

                <a onClick={handleDrowpDown} className="btn-param" >
                    Parametres {showParams ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
                </a>

                {
                    showParams ? <>
                        <NavLink className={customClassName} to="/admin/parametres">
                            Parametres 1
                        </NavLink>

                        <NavLink className={customClassName} to="/admin/parametres">
                            Parametres 2
                        </NavLink>

                        <NavLink className={customClassName} to="/admin/parametres">
                            Parametres 1
                        </NavLink>
                        <NavLink className={customClassName} to="/admin/parametres">
                            Parametres 2
                        </NavLink>
                    </> : null
                }



            </ul>
        </nav >
    );
};

export default Sidebar;

