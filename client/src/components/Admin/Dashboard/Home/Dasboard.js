import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, CardBody, Table, } from "reactstrap";
import { dashboardData } from "../../../../store/actions/actions_dashboard_data";

import "./Home.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {data, loading } = useSelector(state => state.dashboard_data);

  useEffect(() => {
    dispatch(dashboardData())
  }, [ dispatch ]);
  return (
    <div>
      <Row className="mt-3">
        <Col xs="12" sm="12" md="12" lg="3" xl="3"  className="fcard">
          <Card>
            <CardBody>
              <Row>
                <Col xs="9" sm="9" md="9" lg="9">
                  <div className="fcard-p">Number of Questions</div>
                </Col>
                <Col xs="3" sm="3" md="3" lg="3">
                  <span className="c-number">{data && data.questions ? data.questions.length : 0}</span>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="12" md="12" lg="3" xl="3" className="fcard">
          <Card>
            <CardBody>
              <Row>
                <Col xs="9" sm="9" md="9" lg="9">
                  <div className="fcard-p">Number of Users</div>
                </Col>
                <Col xs="3" sm="3" md="3" lg="3">
                  <span className="c-number">{data && data.users ? data.users.length : 0}</span>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="12" md="12" lg="3" xl="3" className="fcard">
          <Card>
            <CardBody>
              <Row>
                <Col xs="9" sm="9" md="9" lg="9">
                  <div className="fcard-p">Number of Admins</div>
                </Col>
                <Col xs="3" sm="3" md="3" lg="3">
                  <span className="c-number">{data && data.admins ? data.admins.length : 0}</span>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="12" md="12" lg="3" xl="3" className="fcard">
          <Card>
            <CardBody>
              <Row>
                <Col xs="9" sm="9" md="9" lg="9">
                  <div className="fcard-p">Current Interview Questions</div>
                </Col>
                <Col xs="3" sm="3" md="3" lg="3">
                  <span className="c-number">{data && data.userQuestions ? data.userQuestions.length : 0}</span>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col className="chart-area" xs="12" sm="12" md="12" lg="6" xl="6">
          <Card className="rp-container">
            <CardBody>
              <h4 className="mt-4 mb-4">Question Table</h4>
              <Table responsive>
                <thead>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  {data.questions && data.questions.length > 0 ? data.questions.map((q,i) => (
                    <tr key={i}>
                      
                      <td>{q.question}</td>
                      <td>{q.answer}</td>
                      <td className="action-td">
                        Delete
                        <div className="action-div">
                          <p>View</p>
                          <p>Update</p>
                          <p>Delete</p>
                        </div>
                      </td>
                    </tr>
                  )) : <h4 className="text-center mt-5">No records found</h4>}
                  
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>

        <Col className="report-l" xs="12" sm="12" md="12" lg="6" xl="6">
          <Card className="rp-container">
            <CardBody>
              <h4 className="mt-4 mb-4">User Table</h4>
             <Table responsive>
              <thead>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Action</th>
              </thead>
              <tbody>
                {data.users && data.users.length > 0 ? data.users.map((u, i) => (
                  <tr key={i}>
                    <td>{u.first_name}</td>
                    <td>{u.last_name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td>Delete</td>
                  </tr>
                )) : <h4 className="text-center mt-5">No records found</h4>}
                
                <tr>
                  <td>Onoja</td>
                  <td>Matthew</td>
                  <td>onoja@gmail.com</td>
                  <td>09012345678</td>
                  <td>Delete</td>
                </tr>
                <tr>
                  <td>Onoja</td>
                  <td>Matthew</td>
                  <td>onoja@gmail.com</td>
                  <td>09012345678</td>
                  <td>Delete</td>
                </tr>
                <tr>
                  <td>Onoja</td>
                  <td>Matthew</td>
                  <td>onoja@gmail.com</td>
                  <td>09012345678</td>
                  <td>Delete</td>
                </tr>
              </tbody>
             </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;