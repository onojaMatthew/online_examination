import React from "react";
import { Route } from "react-router-dom";
import { Layout } from 'antd';
import Sidebar from "../Sidebar/Sidebar";
import Head from "../Header/Head";
import Dashboard from "./Dasboard";
import Question from "../Question/Question";
import Complete from "../../../User/Start/Complete";
import UserManagement from "../UserManagement/UserManagement";

const { Content, Footer } = Layout;

const Home = (props) => {
  const { match } = props; 
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout className="site-layout">
        <Head />
        <Content className="dashboard-container-wrapper">
          <div className="site-layout-background dashboard-content">
            <Route exact path={`${match.url}`} render={(props) => <Dashboard {...props} />} />
            <Route path={`${match.url}/questions`} render={(props) => <Question {...props} />} />
            <Route path={`${match.url}/user_management`} render={(props) => <UserManagement {...props} />} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2021 Developed by Onoja Igoche Matthew</Footer>
      </Layout>
    </Layout>
  );
}

export default Home;