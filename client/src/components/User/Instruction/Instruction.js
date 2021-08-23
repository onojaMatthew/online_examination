import React, { useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { Button } from "antd";
import { Row, Col } from "reactstrap";
import "./Instruction.css";

const Instruction = () => {
  const [ count, setCount ] = useState(0);
  const match = useRouteMatch();
  const history = useHistory();

  const url = match.url.split("/").slice(1)
  url.pop();
  const path = url.join("/");
  return (
    <div className="instruction-container">
      <Row>
        <Col xs="12" sm="12" md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
          <h3 className="text-center">Test Instructions</h3>
          {
            count === 0 ? (
              <div className="instruction-text">
                <h3 className="text-center">1</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae libero 
                  ultricies, tristique purus a, dictum nulla. Nunc malesuada lobortis odio ut 
                  molestie. Maecenas accumsan et turpis nec mollis.
                </p>
              </div>
            ) :
            count === 1 ? (
              <div className="instruction-text">
                <h3 className="text-center">2</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae libero 
                  ultricies, tristique purus a, dictum nulla. Nunc malesuada lobortis odio ut 
                  molestie. Maecenas accumsan et turpis nec mollis.
                </p>
              </div>
            ) : (
              <div className="instruction-text">
                <h3 className="text-center">3</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae libero 
                  ultricies, tristique purus a, dictum nulla. Nunc malesuada lobortis odio ut 
                  molestie. Maecenas accumsan et turpis nec mollis.
                </p>
              </div>
            )
          }
          <Row>
            <Col xs="6" sm="6" md="6" xl="6" lg="6">
              {count === 0 ? null : <Button className="nexted-button" onClick={() => setCount(count-1)}>Back</Button>}
            </Col>
            <Col xs="6" sm="6" md="6" xl="6" lg="6">
              <Button className="nexted-button" disabled={count === 2 ? true : false} style={{float: "right"}} onClick={() => setCount(count+1)}>Next</Button>
            </Col>
          </Row>
          
        </Col>
      </Row> 
      <Row className="continue-text">
        <Col xs="12" sm="12" md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
          <p>To continue taking test, click <span onClick={() => history.push(`/${path}/start`)}>continue</span></p>
        </Col>
      </Row>
    </div>
  )
}

export default Instruction;