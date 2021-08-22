import React, { useEffect, useState } from "react";
import { localAuth } from "../../../helper/authenticate";
import { Card, CardBody, Col, Input, Modal, ModalBody, ModalHeader, Row, Spinner, Table } from "reactstrap";
import { Button } from "antd";

import "./Groups.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createGroup, groupDelete, groupList, groupUpdate } from "../../../store/actions/actions_group";

const Groups = () => {
  const dispatch = useDispatch()
  const { 
    groups,
    create_group_success, 
    create_group_loading, 
    group_list_loading,
    group_update_loading,
    group_update_success, 
  } = useSelector(state => state.group);
  const [ modal, setModal ] = useState(false);
  const [ name, setName ] = useState("");
  const [ view, setView ] = useState(false);
  const [ groupId, setGroupId ] = useState("");
  const church = localAuth() && localAuth().church && localAuth().church._id;

  const toggle = () => {
    setModal(!modal);
  }

  const handleToggleChange = (e, id) => {
    const { value } = e.target;
    
    if (value === "edit") {
      toggle();
      setGroupId(id)
    } else if (value === "view") {
      // setGroupId(id);
      setView(true);
    } else {
      // setGroupId(id);
      handleDelete(id);
    }
  }

  const handleDelete = (id) => {
    const data = { id }
    dispatch(groupDelete(data))
  }

  useEffect(() => {
    dispatch(groupList());
  }, [ dispatch ]);

  const handleSubmit = () => {
    const data = { church, name };
    dispatch(createGroup(data));
  }

  useEffect(() => {
    if (create_group_success || group_update_success) {
      setName("")
    }
  }, [ create_group_success, group_update_success ]);

  const onEdit = () => {
    const data = { id: groupId, name };
    dispatch(groupUpdate(data));
  }

  return (
    <div>
      {view ? (
        <Row>
          <Col xs="12" sm="12" md="12" lg="12" xl="12">
            <Card className="group-member-card">
              <CardBody>
                <ArrowLeftOutlined onClick={() => setView(false)} id="left-arrow" />
                <h3>Choir Members</h3>
                <Table responsive>
                  <thead>
                    <th>S/N</th>
                    <th>F. Name</th>
                    <th>L. Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>State </th>
                    <th>DoB</th>
                    <th>M. Status</th>
                    <th>Action</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>John</td>
                      <td>Doe</td>
                      <td>doe@gmail.com</td>
                      <td>08022342311</td>
                      <td>Gbagada</td>
                      <td>Lagos</td>
                      <td>10/19/1988</td>
                      <td>Single</td>
                      <td>Suspend</td>
                    </tr>

                    <tr>
                      <td>2</td>
                      <td>John</td>
                      <td>Doe</td>
                      <td>doe@gmail.com</td>
                      <td>08022342311</td>
                      <td>Gbagada</td>
                      <td>Lagos</td>
                      <td>10/19/1988</td>
                      <td>Single</td>
                      <td>Suspend</td>
                    </tr>

                    <tr>
                      <td>3</td>
                      <td>John</td>
                      <td>Doe</td>
                      <td>doe@gmail.com</td>
                      <td>08022342311</td>
                      <td>Gbagada</td>
                      <td>Lagos</td>
                      <td>10/19/1988</td>
                      <td>Single</td>
                      <td>Suspend</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <Card className="group-form-card">
              <CardBody>
                <h3>Create New Group</h3>
                <Row>
                  <Col xs="12" sm="12" md="12" lg="12" xl="12">
                    <label>Name</label>
                    <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" sm="12" md="12" lg="12" xl="12">
                    {create_group_loading ? <Button className="login-button" loading>Loading...</Button> : 
                    <Button onClick={handleSubmit} className="login-button">Login</Button>}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <Card className="group-form-card">
              <CardBody>
                <h3>Group List</h3>
                {group_list_loading ? <div className="text-center">
                  <Spinner>
                    <span className="visually-hidden">Loading</span>
                  </Spinner>
                </div> : 
                groups && groups.length > 0 ? groups.map(g => (
                  <Row>
                    <Col xs="8" sm="8" md="9" lg="9" xl="9">
                      <Input value={g && g.name} />
                    </Col>
                    <Col xs="4" sm="4" md="3" lg="3" xl="3">
                      <Input type="select" onChange={(e) => handleToggleChange(e, g._id)}>
                        <option>Actions</option>
                        <option value="view">View Members</option>
                        <option value="edit">Edit Group</option>
                        <option value="delete">Delete Group</option>
                      </Input>
                    </Col>
                  </Row>
                )) : <p className="text-center">No records found</p>}
                
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
      
      <Modal isOpen={modal} toggle={toggle} className="group-modal">
        <ModalHeader toggle={toggle}>Edit Group</ModalHeader>
        <ModalBody>
         
          <Row>
            <Col xs="12" sm="12" md="12" lg="12" xl="12">
              <label>Name</label>
              <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="12" md="12" lg="12" xl="12">
            {group_update_loading ? <Button className="group-submit-btn" loading>Loading...</Button> : 
              <Button onClick={onEdit} className="group-submit-btn">Login</Button>}
              <Button onClick={onEdit} className="">Submit</Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Groups;