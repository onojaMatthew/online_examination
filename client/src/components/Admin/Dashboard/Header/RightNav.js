import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../store/actions/actions_login"


const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
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
  const dispatch = useDispatch();
  const history = useHistory();
  const { logoutSuccess } = useSelector(state => state.account);
  
  const onLogout = () => {
    dispatch(logout());
  }

  useEffect(() => {
    if (logoutSuccess) {
      history.push("/");
    }
  }, [ logoutSuccess, history ]);

  return (
    <Ul open={open}>
      <li onClick={() => history.push("/dashboard")}>Dashboard</li>
      <li onClick={() => history.push("/dashboard/admins")}>Manage Admins</li>
      <li onClick={() => history.push("/dashboard/create-church")}>Create Church</li>
      <li onClick={() => history.push("/dashboard/church-list")}>Church List</li>
      <li onClick={onLogout}>Logout</li>
    </Ul>
  )
}


export default RightNav;