import React from "react";
import { Layout } from "antd";
import Navbar from "./Navbar";
import "./Header.css";

const { Header  } = Layout;

const Head = () => {
  return (
    <div>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="header-container">
        <Header className="site-layout-background" style={{ padding: 0 }} />
      </div>
      
    </div>
  )
}

export default Head;