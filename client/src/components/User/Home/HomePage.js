import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Row, Col, Spinner } from "reactstrap";
import { Button, Image } from "antd";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { userDetail } from "../../../store/actions/actions_user";
import Icon from "../../../assets/images/employee.jpg";
import Auth from "../../../helper/Auth";

const HomePage = () => {
  const dispatch = useDispatch();
  const [ domain_name, setSubdomain ] = useState("");
  const { user, loading } = useSelector(state => state.user);
  const [ message, setMessage ] = useState("");
  const [ token, setToken ] = useState({});
  const match = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    setToken(JSON.parse(Auth.getToken()));
  }, []);

  useEffect(() => {
    const url = match.url.split("/").slice(2)
    const path = url[0];
    setSubdomain(path)
  }, [ match ]);

  useEffect(() => {
    if (domain_name && domain_name.length > 0) {
      dispatch(userDetail(domain_name));
    }
  }, [ dispatch, domain_name ]);

  useEffect(() => {
    if (!user) {
      setMessage("You are not invited to take this test");
    }
  }, [ user, domain_name ]);

  return (
    <div>
      {loading ? (
        <div className="text-center spinn">
          <Spinner style={{ fontSize: 100}}>
            <span className="visually-hidden">Loading</span>
          </Spinner>
        </div>
      ) : message.length > 0 ? (
        <Row>
        <Col className="error_message">
          <h3 className="text-center">Oops!</h3>
          <p>
            You were not invited to this test
          </p>
        </Col>
      </Row>
      ) : (
      <Row>
        <Col xs="12" sm="12" md="12" lg="4" xl="4" className="login-left-cont">
          <h3 className="text-center">Welcome</h3>
          <Row className="mt-5">
            <Col xs="12" sm="12" md="12" lg="12" xl="12">
              <p className="text-center">You're are on GPI Test</p>
            </Col>
          </Row>  
          <Row className="text-center pl-5">
            <Col className="pl-5" xs="6" sm="6" md="6" lg="6" xl="6">
              <Image src={Icon} preview={false} width={300} />
            </Col>
          </Row>   
        </Col>
        <Col xs="12" sm="12" md="12" lg="8" className="login-right-cont">
          <Row className="text-center">
            <Col xs="12" sm="12" md="12" lg="12">
              <h3 className="text-center">Welcome</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae libero 
                ultricies, tristique purus a, dictum nulla. Nunc malesuada lobortis odio ut 
                molestie. Maecenas accumsan et turpis nec mollis.
              </p>
              <Row>
                <Col xs="12" sm="12" md="12" lg={{ size: 4, offset: 4}} xl={{ size: 4, offset: 4}}>
                  <Button onClick={() => history.push(`${match.url}/instruction`)} className="continue-button">Continue</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row> 
      )}
    </div>
  );
}

export default HomePage;