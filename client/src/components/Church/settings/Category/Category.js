import React from "react";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
import { Button } from "antd";

import "./Category.css";

const Category = () => {
  return (
    <div>
      <Card>
        <CardBody>
          <Table responsive>
            <tbody>
              <tr>
                <td>First Time Guests</td>
                <td>
                  <Button>Edit</Button>
                </td>
                <td>
                  <Button>Delete</Button>
                </td>
              </tr>
              <tr>
                <td>Individuals</td>
                <td>
                  <Button>Edit</Button>
                </td>
                <td>
                  <Button>Delete</Button>
                </td>
              </tr>
              <tr>
                <td>Family</td>
                <td>
                  <Button>Edit</Button>
                </td>
                <td>
                  <Button>Delete</Button>
                </td>
              </tr>
            </tbody>
          </Table>
          <Row>
            <Col xs="12" sm="12" md="12" lg="6" xl="6">
              <Button>Create New Category</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

export default Category;