import { EyeOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardBody, Col, Input, Row, Spinner, Table } from "reactstrap";
import { memberList, postMember, searchMember, updateMember } from "../../../../store/actions/actions_member";
import { categoryDetail, categoryList } from "../../../../store/actions/actions_mem_category";
import Member from "./MemberDetail";
import { errorMsg, success } from "../../../../helper/message";

import "./MemberList.css";
import NewMember from "../NewMember/NewMember";
import { localAuth } from "../../../../helper/authenticate";

const MemberList = () => {
  const dispatch = useDispatch();
  const church = localAuth() && localAuth().church && localAuth().church._id;
  const { listLoading, members, postSuccess, updateLoading, postLoading, error } = useSelector(state => state.member);
  const { categories, categoryInfo, categorySuccess } = useSelector(state => state.category);
  const [ values, setValues ] = useState({ 
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    city: "",
    street: "",
    state: "",
    state_of_origin: "",
    marital_status: "",
    occupation: "",
    category: "",
    dob: "",
    membershipCategory: ""
  });
  const [ id, setId ] = useState("");
  const [ modal, setModal ] = useState(false);
  const [ isOpen, setIsOpen ] = useState(false);
  const [ currentMember, setCurrentMember ] = useState({});
  const history = useHistory();
  const [ searchTerm, setSearchTerm ] = useState("");
  const toggle = (id) => {
    setId(id)
    setModal(!modal);
  }

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  }

  const {
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
  } = values;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value })
  }

  useEffect(() => {
    dispatch(memberList());
    dispatch(categoryList())
  }, [ dispatch ]);

  useEffect(() => {
    if (currentMember && currentMember._id !== null) {
      setValues({ 
        first_name: currentMember.first_name,
        last_name: currentMember.last_name,
        email: currentMember.email,
        phone: currentMember.phone,
        city: currentMember.address && currentMember.address.city,
        street: currentMember.address && currentMember.address.street,
        state: currentMember.address && currentMember.address.state,
        state_of_origin: currentMember.state_of_origin,
        marital_status: currentMember.marital_status,
        occupation: currentMember.occupation,
        dob: currentMember.dob,
        membershipCategory: currentMember.membershipCategory,
      })
      dispatch(categoryDetail(currentMember && currentMember.category))
    }
  }, [ currentMember, dispatch ]);

  useEffect(() => {
    if (error && error === "Operation `members.find()` buffering timed out after 10000ms") {
      errorMsg("Request timed out. Check your network and try again")
    } else if (error && error.includes("Could not connect to any servers in your MongoDB Atlas cluster.")) {
      errorMsg("Request failed due to network error");
    } else if (error === "Invalid token" || error.includes("Invalid role")) {
      history.push("/church-login")
    }
  }, [ error, history ]);

  useEffect(() => {
    if (id && id.length > 0) {
      const selectedMember = members && members.docs.find(m => m._id === id);
      setCurrentMember(selectedMember);
    }
  }, [ id, members ]);

  useEffect(() => {
    if (categorySuccess && categoryInfo && categoryInfo._id !== null) {
      setValues({ category: categoryInfo.name});
    }
  }, [ categoryInfo, categorySuccess ]);

  const handleSubmit = () => {
    const data = {
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
      church,
    }

    dispatch(postMember(data));
  }

  useEffect(() => {
    if (postSuccess) {
      setIsOpen(false);
      success("New member added");
    }
  }, [ postSuccess ]);

  useEffect(() => {
    if (searchTerm && searchTerm.length > 0) {
      dispatch(searchMember(searchTerm));
    }
  }, [ searchTerm, dispatch ]);

  const onMemberUpdate = () => {
    const data = {
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
      church,
      id,
    }

    dispatch(updateMember(data));
  }

  return (
    <div>
      <Card className="member-card">
        <CardBody>
          <Row className="member-header-row">
            <Col xs="12" sm="12" md="12" lg="2" xl="2">
              <p className="member-header">Member List</p>
            </Col>
            <Col xs="12" sm="12" md="12" lg="8" xl="8">
              <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." />
            </Col>
            <Col xs="12" sm="12" md="12" lg="2" xl="2" className="create-toggle-btn">
              <Button onClick={toggleOpen} className="create-member-header-button lead">Create a New Member</Button>
            </Col>
          </Row>

          <Row>
            <Col xs="12" sm="12" md="12" lg="12" xl="12">
              <Table responsive>
                <thead>
                  <th>S/N</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Email</th>
                  <th>Phone number</th>
                  <th>State of Origin</th>
                  <th>Occupation</th>
                  <th>Marital Status</th>
                  <th>Action</th>
                </thead>
                {listLoading ? 
                <div className="text-center mt-5">
                  <Spinner color="info" animation="grow">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div> : 
                members && members.length > 0 ? (
                  <tbody>
                    {members && members.map((m, i) => (
                      <tr key={m._id}>
                        <td>{i+1}</td>
                        <td>{m && m.first_name}</td>
                        <td>{m && m.last_name}</td>
                        <td>{m && m.email}</td>
                        <td>{m && m.phone}</td>
                        <td>{m && m.state_of_origin}</td>
                        <td>{m && m.occupation}</td>
                        <td>{m && m.marital_status}</td>
                        <td className="view-member-button" onClick={() => toggle(m._id)}><EyeOutlined size="large" /> View</td>
                      </tr>
                    ))}
                  </tbody>
                 ) :
                 members && members.docs && members.docs.length > 0 ? (
                  <tbody>
                    {members && members.docs && members.docs.map((m, i) => (
                      <tr key={m._id}>
                        <td>{i+1}</td>
                        <td>{m && m.first_name}</td>
                        <td>{m && m.last_name}</td>
                        <td>{m && m.email}</td>
                        <td>{m && m.phone}</td>
                        <td>{m && m.state_of_origin}</td>
                        <td>{m && m.occupation}</td>
                        <td>{m && m.marital_status}</td>
                        <td className="view-member-button" onClick={() => toggle(m._id)}><EyeOutlined size="large" /> View</td>
                      </tr>
                    ))}
                  </tbody>
                 ) : 
                 <p className="text-center mt-5">No records found</p>}
                
              </Table>
            </Col>
          </Row>
          <Member 
            toggle={toggle}
            handleSubmit={handleSubmit}
            modal={modal}
            handleChange={handleChange}
            first_name={first_name}
            last_name={last_name}
            email={email}
            phone={phone}
            city={city}
            street={street}
            state={state}
            state_of_origin={state_of_origin}
            marital_status={marital_status}
            occupation={occupation}
            category={category}
            dob={dob}
            onMemberUpdate={onMemberUpdate}
            updateLoading={updateLoading}
            categories={categories}
          />
        </CardBody>
      </Card>
      <NewMember
        isOpen={isOpen}
        toggleOpen={toggleOpen}
        categories={categories}
        handleChange={handleChange}
        first_name={first_name}
        last_name={last_name}
        email={email}
        phone={phone}
        city={city}
        street={street}
        state={state}
        state_of_origin={state_of_origin}
        marital_status={marital_status}
        occupation={occupation}
        category={category}
        dob={dob}
        handleSubmit={handleSubmit}
        postLoading={postLoading}
        postSuccess={postSuccess}
      />
    </div>
  );
}

export default MemberList;