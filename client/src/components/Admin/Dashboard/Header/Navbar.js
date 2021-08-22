import React from "react";
import styled from 'styled-components';
import Burger from './Burger';

const Nav = styled.nav`
  width: 100%;
  height: 55px;
  border-bottom: 2px solid #f1f1f1;
  display: flex;
  background-color: #FFFFFFF !important;
  justify-content: space-between;
  .logo {
    position: fixed;
    z-index: 1;
    padding: 15px 15px;
    background: #FFF;
    width: 100%;
    height: 60px;
    box-shadow: 0px 1px rgba(0, 0, 0, 0.125);
  }
`

const Navbar = () => {
  return (
    <Nav>
      <div className="logo">
        Nav Bar
      </div>
      <Burger />
    </Nav>
  )
}

export default Navbar;


