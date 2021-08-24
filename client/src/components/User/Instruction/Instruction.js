import React, { useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { Button, Image } from "antd";
import { Row, Col } from "reactstrap";
import "./Instruction.css";
import Icon from "../../../assets/images/employee.jpg";

const Instruction = () => {
  const [ count, setCount ] = useState(0);
  const match = useRouteMatch();
  const history = useHistory();

  const url = match.url.split("/").slice(1)
  url.pop();
  const path = url.join("/");
  return (
    <div>
      <Row>
        <Col xs="12" sm="12" md="12" lg="4" xl="4" className="instruction-left-cont">
          <h3 className="text-center">Welcome to XYZ Test</h3>
          <Row className="mt-5">
            <Col xs="6" sm="6" md="6" lg="6" xl="6">
              <p className="questn-no">No. of questions</p>
              <p className="questn-no">50</p>
            </Col>
            <Col xs="6" sm="6" md="6" lg="6" xl="6">
            <p>Test duration</p>
              <p>1hr</p>
            </Col>
          </Row>  
          <Row className="text-center pl-5">
            <Col className="pl-5" xs="6" sm="6" md="6" lg="6" xl="6">
              <Image src={Icon} preview={false} width={300} />
            </Col>
          </Row>   
        </Col>
        <Col xs="12" sm="12" md="12" lg="8" className="instruction-right-cont">
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
          <Row className="continue-text">
            <Col xs="12" sm="12" md="12" lg="12">
              <p>To continue taking test, click <span onClick={() => history.push(`/${path}/start`)}>continue</span></p>
            </Col>
          </Row>
        </Col>
      </Row> 
    </div>
  )
}

export default Instruction;