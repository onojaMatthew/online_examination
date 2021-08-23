import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Row, Col, Spinner } from "reactstrap";
import { Button } from "antd";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { userDetail } from "../../../store/actions/actions_user";

const HomePage = () => {
  const dispatch = useDispatch();
  const [ domain_name, setSubdomain ] = useState("");
  const { user, loading } = useSelector(state => state.user);
  const [ message, setMessage ] = useState("");
  const match = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    setSubdomain(match.params.domain_name)
  }, [ match ]);

  useEffect(() => {
    if (domain_name && domain_name.length > 0) {
      dispatch(userDetail(domain_name));
    }
  }, [ dispatch, domain_name ]);

  useEffect(() => {
    if (user && user.domain_name && user.domain_name.toString() !== domain_name.toString()) {
      setMessage("You are not invited to take this test");
    }
  }, [ user, domain_name ]);

  return (
    <div className="login-container">
      {loading ? (
        <div className="text-center">
          <Spinner style={{ fontSize: 100}}>
            <span className="visually-hidden">Loading</span>
          </Spinner>
        </div>
      ) : message.length > 0 ? (
        <Row>
          <Col xs="12" sm="12" md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
            <h3 className="text-center">Oops!</h3>
            <p>
              You were not invited to this test
            </p>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col xs="12" sm="12" md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
            <h3 className="text-center">Welcome</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae libero 
              ultricies, tristique purus a, dictum nulla. Nunc malesuada lobortis odio ut 
              molestie. Maecenas accumsan et turpis nec mollis.
            </p>
            <Button onClick={() => history.push(`${match.url}/instruction`)} className="continue-button">Continue</Button>
          </Col>
        </Row>
      )}
      
    </div>
  );
}

export default HomePage;