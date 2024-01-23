import React, { useContext, useState } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { RiArrowDropDownLine } from "react-icons/ri";
import { useUserContext } from "../../helper/UserContext"

const Header: React.FC = () => {

    const { userProfile } = useUserContext();

    return (
        <div className="d-flex align-items-center justify-content-between border border-bottom mb-3 p-2">
            <div>
                <h3>SOCIR SA</h3>
            </div>
            <div className="d-flex align-items-center gap-2">
                <Nav.Link href="#home">
                    {userProfile?.nom_utilisateur?.toUpperCase()}
                </Nav.Link>
                <Nav.Link href="#home">
                    <img src="https://via.placeholder.com/40x40" className="rounded-circle" />
                </Nav.Link>
                <NavDropdown title="" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
            </div>
        </div >
    );
};

export default Header;