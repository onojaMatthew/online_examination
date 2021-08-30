import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Avatar, Image, Layout, Menu } from 'antd';
import {
  FaUser,
  FaQuestion,
  FaPowerOff,
  FaTachometerAlt
} from 'react-icons/fa';
import Logo from "../../../../assets/images/User.jpeg";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../store/actions/actions_login";

const { Sider } = Layout;

const Sidebar = () => {
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
    <div className="side-container">
      <Sider>
        <div className="text-center mt-5 mb-4">
          <Avatar src={<Image src={Logo} />} size={90}/>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item onClick={() => history.push("/dashboard")} key="1" icon={<FaTachometerAlt />}>
            Dashboard
          </Menu.Item>
          <Menu.Item onClick={() => history.push("/dashboard/questions")} key="2" icon={<FaQuestion />}>
            Question Management
          </Menu.Item>
          <Menu.Item key="3" onClick={() => history.push("/dashboard/user_management")} icon={<FaUser />}>
            User Management
          </Menu.Item>
          <Menu.Item key="4" onClick={() => history.push("/dashboard/assign_question")} icon={<FaQuestion />}>
            Assign Question
          </Menu.Item>
          <Menu.Item onClick={onLogout} key="5" icon={<FaPowerOff />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  )
}

export default Sidebar;