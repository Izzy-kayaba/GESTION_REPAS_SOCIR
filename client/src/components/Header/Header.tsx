import React, { useContext, useState } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";
import { useUserContext } from "../../helpers/UserContext"

const Header: React.FC = () => {

    const { userProfile } = useUserContext();

    return (
        <div className="d-flex align-items-center justify-content-between border border-bottom mb-3 p-2">
            <div>
                <h3>SOCIR SA</h3>
            </div>
            <div className="d-flex align-items-center gap-2">
                <a href="#home">
                    {userProfile?.nom_utilisateur?.toUpperCase()}
                </a>
                <a href="#home">
                    <img src="https://via.placeholder.com/40x40" className="rounded-circle" />
                </a>
            </div>
        </div >
    );
};

export default Header;