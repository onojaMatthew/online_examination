import React from "react";
import { Route } from "react-router-dom";
import { Layout } from 'antd';

import Sidebar from "../Sidebar/Sidebar";
import Head from "../Header/Head";
import Dashboard from "./Dasboard";
import MemberList from "../Member/MemberList/MemberList";
import Settings from "../settings/Settings";
import Groups from "../Groups/Groups";


const { Content, Footer } = Layout;

const ChurchHomePage = (props) => {
  const { match } = props;
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout className="site-layout">
        <Head />
        <Content className="dashboard-container-wrapper">
          <div className="site-layout-background dashboard-content">
            <Route exact path={`${match.url}`} render={(props) => <Dashboard {...props} />} />
            <Route exact path={`${match.url}/members`} render={(props) => <MemberList {...props} />} />
            <Route path={`${match.url}/groups`} render={(props) => <Groups {...props} />} />
            <Route exact path={`${match.url}/settings`} render={(props) => <Settings {...props} />} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2021 Developed by Onoja Igoche Matthew</Footer>
      </Layout>
    </Layout>
  );
}

export default ChurchHomePage;