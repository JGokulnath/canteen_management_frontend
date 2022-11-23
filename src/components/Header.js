import React, { useState } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
} from "reactstrap";

const Header = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  const adminNavLinks = [
    { title: "Inventory", path: "/products" },
    { title: "Menu", path: "/menu" },
  ];
  return (
    <Navbar color="primary" expand="sm">
      <NavbarBrand href="/">K Canteen</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          {!isAdmin ? (
            <NavItem>
              <Link to="/orders">Orders</Link>
            </NavItem>
          ) : (
            adminNavLinks.map((item) => (
              <NavItem key={item.title}>
                <NavLink to={item.path} className="nav-link">
                  {item.title}
                </NavLink>
              </NavItem>
            ))
          )}
        </Nav>
        <Button color="light" onClick={handleLogout}>
          Logout
        </Button>
      </Collapse>
    </Navbar>
  );
};
export default Header;
