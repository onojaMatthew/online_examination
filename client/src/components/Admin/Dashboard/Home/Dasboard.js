import React, { useEffect } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Avatar, Image } from "antd";
import Charts from "../../../Chart/Chart";
import { localAuth } from "../../../../helper/authenticate";
import User from "../../../../assets/images/User.jpeg";
import { useDispatch, useSelector } from "react-redux";

import "./Home.css";
import { churchList } from "../../../../store/actions/actions_church";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { churches } = useSelector(state => state.church);
  const admin = localAuth() && localAuth().user;
  useEffect(() => {
    dispatch(churchList());
  }, [ dispatch ]);

  return (
    <div>
      <Row className="mb-4">
        <Col xs="4" sm="4" md="3" lg="1" xl="1">
          <Avatar src={<Image src={User} />} size={100} />
        </Col>
        <Col xs="8" sm="8" md="9" lg="10" xl="10" className="p-4 greeting">
          <h1>Hello {admin && admin.first_name} {admin && admin.last_name}</h1>
          <p>Welcome to your admin dashboard</p>
        </Col>
        
      </Row>
      <Row>
        <Col xs="12" sm="12" md="12" lg="3" xl="3"  className="fcard">
          <Card>
            <CardBody>
              <Row>
                <Col xs="9" sm="9" md="9" lg="9">
                  <div className="fcard-p">Number of Churches</div>
                </Col>
                <Col xs="3" sm="3" md="3" lg="3">
                  <span className="c-number">{churches && churches.length > 0 ? churches.length : 0}</span>
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
                  <div className="fcard-p">Times of Watching</div>
                </Col>
                <Col xs="3" sm="3" md="3" lg="3">
                  <span className="c-number">100</span>
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
                  <div className="fcard-p">Upcoming Programs</div>
                </Col>
                <Col xs="3" sm="3" md="3" lg="3">
                  <span className="c-number">100</span>
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
                  <div className="fcard-p">Audience Reached</div>
                </Col>
                <Col xs="3" sm="3" md="3" lg="3">
                  <span className="c-number">100</span>
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
              <Row>
                <Col className="report-card" xs="10" sm="10" md="10" lg="10">
                  <h1 className="">Monthly Report</h1>
                </Col>
                <Col xs="2" sm="2" md="2" lg="2">
                  {/* <span className="c-number">100</span> */}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Charts />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>

        <Col className="report-l" xs="12" sm="12" md="12" lg="6" xl="6">
          <Card className="rp-container">
            <CardBody>
              <Row className="mb-5">
                <Col className="report-card" xs="10" sm="10" md="10" lg="10">
                  <h1 className="">Summary of Reports</h1>
                </Col>
                <Col xs="2" sm="2" md="2" lg="2">
                  {/* <p className="">100</p> */}
                </Col>
              </Row>

              <Row>
                <Col xs="12" sm="12" md="12" lg="6" xl="6">
                  <Card className="st-card">
                    <CardBody>
                      <h1 className="text-center">Income</h1>
                      <p className="text-center">&#8358;8,833,000</p>
                    </CardBody>
                  </Card>
                </Col>
                <Col xs="12" sm="12" md="12" lg="6" xl="6">
                  <Card className="st-card2">
                    <CardBody>
                      <h1 className="text-center">Admins</h1>
                      <p className="text-center">40</p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col xs="12" sm="12" md="12" lg="6" xl="6">
                  <Card className="st-card3">
                    <CardBody>
                      <h1 className="text-center">Branches</h1>
                      <p className="text-center">300</p>
                    </CardBody>
                  </Card>
                </Col>
                <Col xs="12" sm="12" md="12" lg="6" xl="6">
                  <Card className="st-card4">
                    <CardBody>
                      <h1 className="text-center">Members</h1>
                      <p className="text-center">34000</p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;