import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

function Topbar() {

  return (
    <Navbar id="topbar" bg="bg-bleu-fonce" expand="sm" className="px-2 text-white">
      <Navbar.Brand href="#home">Your Logo</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="m-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
          <Nav.Link href="#services">Services</Nav.Link>
          <Nav.Link href="#contact">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Topbar