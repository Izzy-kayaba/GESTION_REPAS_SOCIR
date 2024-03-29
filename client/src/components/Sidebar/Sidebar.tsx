import React, { useState } from 'react';
import style from "./Sidebar.module.css"
import { Button, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { GiMeal } from "react-icons/gi";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";

const Sidebar: React.FC = () => {
    
    const customClassName = ({ isActive }: { isActive: boolean }) =>
        isActive ? `${style.link_nav} ${style.active}` : `${style.link_nav}`;

    const [showParams, setShowParams] =useState<Boolean>(false);

    const handleDrowpDown = () => {
        setShowParams(!showParams);
    }

    return (
        <nav id="sidebar" className={style.nav}>
            <h2 className={style.titre_menu}>Administration</h2>
            <ul className={style.ul}>
                <NavLink className={customClassName} to="/admin">
                    TABLEAU DE BORD
                </NavLink>
                <NavLink className={customClassName} to="/admin/repas-du-jour">
                    Repas du Jour
                    {/* <GiMeal className="border border-1" /> */}
                </NavLink>
                <NavLink className={customClassName} to="/admin/ajouter-participant">
                    Ajouter participant
                </NavLink>
                <NavLink className={customClassName} to="/admin/audit">
                    Audit
                </NavLink>

                <a onClick={handleDrowpDown} className={style.btn_param} role="button" >
                    CONFIGURATION {showParams ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
                </a>
                {
                    showParams ? <>
                        <NavLink className={customClassName} to="/admin/configuration">
                            Mise a jour
                        </NavLink>
                        <NavLink className={customClassName} to="/admin/configuration/utilisateurs">
                            Utilisateurs
                        </NavLink>
                        <NavLink className={customClassName} to="/admin/configuration/profile">
                            Profile
                        </NavLink>
                    </> : null
                }
            </ul>
        </nav >
    );
};

export default Sidebar;

