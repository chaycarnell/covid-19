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
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import TelegramIcon from './telegram.png';

const TelegramLink = styled('img')`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const linkToBot = () => window.open('http://t.me/Covid19reporter_bot');

const Render = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = route => history.push(route);
  return (
    <Navbar color="dark" dark expand="sm">
      <NavbarBrand href="/">Covid-19 Report</NavbarBrand>
      {/* <NavbarToggler onClick={toggle} /> */}
      <NavbarBrand className="mr-2" onClick={() => linkToBot()}>
        <TelegramLink src={TelegramIcon}></TelegramLink>
      </NavbarBrand>
      {/* <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink onClick={() => navigate('drawdown')}>Drawdown</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => navigate('servers')}>Servers</NavLink>
          </NavItem>
        </Nav>
      </Collapse> */}
    </Navbar>
  );
};

export default Render;
