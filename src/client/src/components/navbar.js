import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

const Render = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = route => history.push(route);
  return (
    <Navbar color="dark" dark expand="sm">
      <NavbarBrand href="/">Covid-19 Report</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          {/* <NavItem>
            <NavLink onClick={() => navigate('drawdown')}>Drawdown</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => navigate('servers')}>Servers</NavLink>
          </NavItem> */}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Render;
