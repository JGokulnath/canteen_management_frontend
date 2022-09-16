import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  return (
    <Navbar color="primary" expand="sm">
      <NavbarBrand href="/">K Canteen</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/orders">Orders</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/">Profile</NavLink>
          </NavItem>
        </Nav>
        <Button color="light" onClick={handleLogout}>
          Logout
        </Button>
      </Collapse>
    </Navbar>
  );
};
export default Header;
