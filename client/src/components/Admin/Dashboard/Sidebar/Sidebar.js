import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Avatar, Image, Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  FileOutlined,
  BankFilled,
  LogoutOutlined
} from '@ant-design/icons';
import Logo from "../../../../assets/images/User.jpeg";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../store/actions/actions_login";

const { Sider } = Layout;
const { SubMenu } = Menu;

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
          <Menu.Item onClick={() => history.push("/dashboard")} key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<FileOutlined />}>
            Create Admins
          </Menu.Item>
          <Menu.Item key="3" icon={<FileOutlined />}>
            Admin List
          </Menu.Item>
          <Menu.Item onClick={() => history.push("/dashboard/create-church")} key="4" icon={<FileOutlined />}>
            Create Church
          </Menu.Item>
          <Menu.Item key="5" onClick={() => history.push("/dashboard/church-list")} icon={<FileOutlined />}>
            Church List
          </Menu.Item>
          <SubMenu key="sub1" icon={<BankFilled />} title="Manage Church">
            <Menu.Item key="3">Create Church</Menu.Item>
            <Menu.Item key="4">Church List</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <Menu.Item onClick={onLogout} key="6" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  )
}

export default Sidebar;