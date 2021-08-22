import React, { useEffect } from "react";
import { Row, Col, Card, CardBody, Button, Spinner } from "reactstrap";
import { Avatar, Image } from "antd";
import Charts from "../../Chart/Chart";
import { localAuth } from "../../../helper/authenticate";
import User from "../../../assets/images/User.jpeg";
import { useDispatch, useSelector } from "react-redux";

import "./Home.css";
import { churchList } from "../../../store/actions/actions_church";
import { dashboardData } from "../../../store/actions/actions_dashboard_data";
import { errorMsg } from "../../../helper/message";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(state => state.dashboard_data);
  const admin = localAuth() && localAuth().user;
  useEffect(() => {
    dispatch(churchList());
    dispatch(dashboardData());
  }, [ dispatch ]);

  useEffect(() => {
    if (error && error.length > 0) {
      if (error.includes("Failed to fetch")) {
        errorMsg("Request failed. Network Error occured")
      } else {
        errorMsg(error);
      }
    }
  });

  return (
    <>
    {loading ? 
      <div className="text-center" style={{ marginTop: "25%"}}>
        <Spinner size="large" color="info" animation="grow">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div> : 
      (
        <div>
          <Row className="dashboard-subhead">
            <Col xs="12" sm="12" md="3" lg="1" xl="1">
              <div className="user-image-cont">
                <Avatar src={<Image src={User} />} size={100} />
              </div>
            </Col>
            <Col xs="12" sm="12" md="9" lg="10" xl="10" className="p-4 greeting">
              
              <Row>
                <Col xs="12" sm="12" md="12" lg="10" xl="10">
                  <h1>Hello {admin && admin.first_name} {admin && admin.last_name}</h1>
                  <p>Welcome to your admin dashboard</p>
                </Col>
                {admin && admin.role && admin.role.role_name === "super admin" && 
                <Col md="2" lg="2" xl="2">
                  <Button onClick={() => window.location.href="/dashboard/church-list"} className="to-adm">Goto Admin Dashboard</Button>
                </Col>}
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="12" md="12" lg="3" xl="3"  className="fcard">
              <Card>
                <CardBody>
                  <Row>
                    <Col xs="9" sm="9" md="9" lg="9">
                      <div className="fcard-p">Number of Groups</div>
                    </Col>
                    <Col xs="3" sm="3" md="3" lg="3">
                      <span className="c-number">{data && data.groupObj && data.groupObj && data.groupObj.totalGroup ? data.groupObj.totalGroup : 0}</span>
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
                      <Charts data={data && data.chart_data} />
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
                          <h1 className="text-center">Offices</h1>
                          <p className="text-center">{data && data.officeObj && data.officeObj.totalOffice ? data.officeObj.totalOffice : 0}</p>
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
                          <p className="text-center">{data && data.memberObj && data.memberObj.totalMember ? data.memberObj.totalMember : 0}</p>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
    
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default Dashboard;