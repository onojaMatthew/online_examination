import React, { useState } from "react";
import { Row, Col, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Avatar, Divider, Button } from "antd";

import "./MemberList.css";

const Member = ({ 
  modal, 
  toggle, 
  handleChange,
  first_name,
  last_name,
  email,
  phone,
  city,
  street,
  state,
  state_of_origin,
  marital_status,
  occupation,
  category,
  dob,
  onMemberUpdate,
  updateLoading,
  categories,
}) => {
  const [ readOnly, setReadOnly ] = useState(true);

  const toggleReadOnly = () => {
    setReadOnly(!readOnly);
  }

  const convertedDOB = dob && new Date(dob).toLocaleDateString();

  return (
    <Modal id="member-detail-modal" isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Member Information</ModalHeader>
      <ModalBody id="modal-body">
        <Row>
          <Col xs="6" sm="6" md="6" lg="9" xl="9">
            <Avatar size={100} />
          </Col>
          <Col xs="6" sm="6" md="6" lg="3" xl="3">
            <Button onClick={toggleReadOnly} className="update-toggle-btn">
              {readOnly ? "Click to Update" : "Stop Update"}
            </Button>
          </Col>
        </Row>
        <Divider>Member Info</Divider>
        <Row className="member-info">
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>First name</label>
            <Input value={first_name} name="first_name" onChange={(e) => handleChange(e)} readOnly={readOnly}/>
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>Last name</label>
            <Input value={last_name} name="last_name" onChange={(e) => handleChange(e)} readOnly={readOnly}/>
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>Email</label>
            <Input value={email} name="email" onChange={(e) => handleChange(e)} readOnly={readOnly}/>
          </Col>
        </Row>
        <Divider>Contact Info</Divider>
        <Row className="member-info">
          <Col xs="12" sm="12" md="12" lg="12" xl="12">
            <label>Street</label>
            <Input onChange={(e) => handleChange(e)} name="street" value={street} readOnly={readOnly}/>
          </Col>
        </Row>
        <Row className="member-info">
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>City</label>
            <Input onChange={(e) => handleChange(e)} name="city" value={city} readOnly={readOnly}/>
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>State</label>
            <Input onChange={(e) => handleChange(e)} name="state" value={state} readOnly={readOnly}/>
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>Phone</label>
            <Input onChange={(e) => handleChange(e)} name="phone" value={phone} readOnly={readOnly}/>
          </Col>
        </Row>
        
        <Divider>Other Info</Divider>

        <Row className="member-info">
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>State of Origin</label>
            <Input onChange={(e) => handleChange(e)} name="state_of_origin" value={state_of_origin} readOnly={readOnly}/>
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>Occupation</label>
            <Input onChange={(e) => handleChange(e)} name="occupation" value={occupation} readOnly={readOnly}/>
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>Marital Status</label>
            <Input onChange={(e) => handleChange(e)} name="marital_status" value={marital_status} readOnly={readOnly}/>
          </Col>
        </Row>
        <Row className="member-info">
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>Date of Birth</label>
            {readOnly ? 
            <Input onChange={(e) => handleChange(e)} name="dob" value={convertedDOB && convertedDOB} readOnly={readOnly}/> :
            <Input type="date" onChange={(e) => handleChange(e)} name="dob" value={dob} readOnly={readOnly}/>
            }
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>Responsibility</label>
            <Input onChange={(e) => handleChange(e)} name="office" value={"Head usher"} readOnly={readOnly}/>
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            {readOnly ? (
              <>
                <label>Membership</label>
                <Input onChange={(e) => handleChange(e)} name="category" value={category} readOnly={readOnly}/>
              </>
            ) : (
              <Input className="membership-categories" type="select" name="category" onChange={(e) => handleChange(e)} >
                <option>Select Membership type</option>
                {categories && categories.map(c => (
                  <option value={c._id}>{c && c.name}</option>
                ))}
              </Input>
            )}
            
          </Col>
        </Row>
        <Divider>Actions</Divider>

        <Row className="member-info">
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            {/* <Button className="add-to-group">Add to Group</Button> */}
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            {updateLoading ? 
              <Button className="a-responsibility" loading>Processing...</Button> :
              <Button onClick={onMemberUpdate} className="a-responsibility">Submit Update</Button>
            }
            
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <Button className="member-delete">Delete</Button>
          </Col>
        </Row>
      </ModalBody>
      {/* <ModalFooter>
        <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter> */}
    </Modal>
  )
}

export default Member;