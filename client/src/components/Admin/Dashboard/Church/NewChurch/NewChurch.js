import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Row, Col, Input, Button, Spinner } from "reactstrap";
import "./NewChurch.css";
import { useDispatch, useSelector } from "react-redux";
import { roleList } from "../../../../../store/actions/actions_role";
import { success, errorMsg } from "../../../../../helper/message";
import { post_church } from "../../../../../store/actions/actions_church";

const NewChurch = () => {
  const dispatch = useDispatch();
  const { roles } = useSelector(state => state.role);
  const { postLoading, postSuccess, error } = useSelector(state => state.church);
  const history = useHistory();
  const [ values, setValues ] = useState({ 
    email: "", 
    password: "", 
    branch: "", 
    city: "", 
    street: "", 
    state: "", 
    phone: "",
    acct_no: "",
    acct_name: "",
    bank_name: "",
    role: "",
    head_pastor: "",
  });

  const {head_pastor, email, password, branch, city, street, bank_name, acct_name, acct_no, state, phone, role } = values;

  useEffect(() => {
    dispatch(roleList());
  }, [ dispatch ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  useEffect(() => {
    if (error && error.length > 0) {
      errorMsg(error);
    }
  }, [ error ]);

  useEffect(() => {
    if (postSuccess) {
      success("Request processed successfully");
      setTimeout(() => {
        history.push("/dashboard/church-list")
      }, 500);
    }
  }, [ postSuccess, history ]);

  const onSubmit = () => {
    const data = {
      email, 
      password, 
      branch, 
      city, 
      street, 
      bank_name, 
      acct_name, 
      acct_no, 
      state, 
      phone, 
      role,
      head_pastor,
    }

    dispatch(post_church(data));
  }

  return (
    <div>
      <Row>
        <Col xs="12" sm="12" md="9" lg="9" xl="9">
          <Card className="newchurch-form">
            <CardBody>
              <h1>The new Church form</h1>
              <Row>
                <Col xs="12" sm="12" md="12" lg="4" xl="4">
                  <label>Head Pastor</label>
                  <Input placeholder="Enter head pastor name" onChange={(e) => handleChange(e)} value={head_pastor} name="head_pastor" />
                </Col>
                <Col xs="12" sm="12" md="12" lg="4" xl="4">
                  <label>Branch Name</label>
                  <Input placeholder="Enter branch name" onChange={(e) => handleChange(e)} value={branch} name="branch" />
                </Col>  
                <Col xs="12" sm="12" md="12" lg="4" xl="4">
                  <label>Select a Role</label>
                  <Input type="select" onChange={(e) => handleChange(e)} name="role">
                    <option>Select a role</option>
                    {roles && roles.length > 0 && roles.map((role, i) => (
                      <option value={role && role._id} key={i}>{role && role.name}</option>
                    ))}
                  </Input>
                </Col> 
              </Row>
              <Row>
                <Col xs="12" sm="12" md="12" lg="4" xl="4">
                  <label>Street</label>
                  <Input placeholder="Enter street" onChange={(e) => handleChange(e)} value={street} name="street" />
                </Col>
                <Col xs="12" sm="12" md="12" lg="4" xl="4">
                  <label>City</label>
                  <Input placeholder="Enter city name" onChange={(e) => handleChange(e)} value={city} name="city" />
                </Col> 
                <Col xs="12" sm="12" md="12" lg="4" xl="4">
                  <label>State</label>
                  <Input placeholder="Enter state" onChange={(e) => handleChange(e)} value={state} name="state" />
                </Col> 
              </Row>
              
              <Row>
                <Col xs="12" sm="12" md="12" lg="4" xl="4">
                  <label>Email</label>
                  <Input placeholder="Enter email" onChange={(e) => handleChange(e)} value={email} name="email" />
                </Col>
                <Col xs="12" sm="12" md="12" lg="4" xl="4">
                  <label>Password</label>
                  <Input placeholder="Enter password" onChange={(e) => handleChange(e)} value={password} name="password" />
                </Col> 
                <Col xs="12" sm="12" md="12" lg="4" xl="4">
                  <label>Phone</label>
                  <Input placeholder="Enter phone" onChange={(e) => handleChange(e)} value={phone} name="phone" />
                </Col>  
              </Row>
              <Row>
                <Col xs="12" sm="12" md="12" lg="4" xl="4">
                  <label>Bank name</label>
                  <Input placeholder="Enter bank name" onChange={(e) => handleChange(e)} value={bank_name} name="bank_name" />
                </Col>
                <Col xs="12" sm="12" md="12" lg="4" xl="4">
                  <label>Account name</label>
                  <Input placeholder="Enter account holder name" onChange={(e) => handleChange(e)} value={acct_name} name="acct_name" />
                </Col> 
                <Col xs="12" sm="12" md="12" lg="4" xl="4">
                  <label>Account number</label>
                  <Input placeholder="Enter account number" onChange={(e) => handleChange(e)} value={acct_no} name="acct_no" />
                </Col>   
              </Row>
              <Row>
                <Col xs="12" sm="12" md="12" lg="6" xl="6">
                  {postLoading ? (
                    <div className="text-center">
                      <Spinner color="info" animation="grow">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  ) : <Button onClick={onSubmit}>Submt</Button>}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default NewChurch;