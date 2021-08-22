import React, { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/actions/actions_login";


const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 14px 10px;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0D2538;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    z-index: 1;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
      cursor: pointer;
    }
  }
`;

const RightNav = ({ open }) => {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();
  const { logoutSuccess } = useSelector(state => state.account);
  
  const onLogout = () => {
    dispatch(logout());
  }

  useEffect(() => {
    if (logoutSuccess) {
      history.push("/church-login");
    }
  }, [ logoutSuccess, history ]);

  return (
    <Ul open={open}>
      <li onClick={() => history.push(`${match && match.url}`)}>Dashboard</li>
      <li onClick={() => history.push(`${match && match.url}/members`)}>Member Management</li>
      <li onClick={() => history.push(`${match && match.url}/groups`)}>Groups & Subgroups Management</li>
      <li onClick={() => history.push(`${match && match.url}/offices`)}>Office Management</li>
      <li onClick={() => history.push(`${match && match.url}/programs`)}>Programs</li>
      <li onClick={() => history.push(`${match && match.url}/birthdays`)}>Birthdays</li>
      <li onClick={() => history.push(`${match && match.url}/weddings`)}>Weddings</li>
      <li onClick={() => history.push(`${match && match.url}/offerings`)}>Offerings</li>
      <li onClick={() => history.push(`${match && match.url}/tithes`)}>Tithes</li>
      <li onClick={() => history.push(`${match && match.url}/thanksgiving`)}>Thanksgiving</li>
      <li onClick={() => history.push(`${match && match.url}/settings`)}>Settings</li>
      <li onClick={onLogout}>Logout</li>
    </Ul>
  )
}

export default RightNav;