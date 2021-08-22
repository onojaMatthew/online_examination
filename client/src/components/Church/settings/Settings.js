import React from "react";
import { Row, Col } from "reactstrap";
import Category from "./Category/Category";
// import Groups from "../Groups/Groups";
import Office from "./Office/Office";

const Settings = () => {
  return (
    <div>
      <Row>
        {/* <Col xs="12" sm="12" md="12" lg="4" xl="4">
          <Groups />
        </Col> */}
        <Col xs="12" sm="12" md="12" lg="4" xl="4">
          <Category />
        </Col>
        <Col xs="12" sm="12" md="12" lg="4" xl="4">
          <Office />
        </Col>
      </Row>
    </div>
  );
}

export default Settings;