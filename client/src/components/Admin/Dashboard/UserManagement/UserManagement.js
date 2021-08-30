import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { Col, Row, Table, Spinner, Card, CardBody } from "reactstrap";

import "../Question/Question.css";
import { deleteUser, getUserList, assingQuestions, createUser } from "../../../../store/actions/actions_user";
import UserQuestion from "./UserQuestion";
import { getQuestionList } from "../../../../store/actions/actions_dashboard_data";
import NewUser from "./NewUser";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, list_loading, create_success, create_loading, delete_loading } = useSelector(state => state.user);
  // const questionList = useSelector(state => state.dashboard_data);
  const { docs } = users;
  const [ modal, setModal ] = useState(false);
  const [ userModal, setUserModal ] = useState(false);
  const [ values, setValues ] = useState({ first_name: "", last_name: "", email: "", phone: "" });
  const [ userId, setUserId ] = useState("");
  
  const [ time, setTime ] = useState("");

  const { first_name, last_name, email, phone } = values;
  useEffect(() => {
    dispatch(getUserList());
    dispatch(getQuestionList());
  }, [ dispatch ]);

  const onDelete = (id) => {
    dispatch(deleteUser(id));
  }

  const toggle = () => {
    setModal(!modal);
  }

  const handleToggleCreate = () => {}

  const handleModalToggle = (id) => {
    setUserId(id);
    setModal(true);
  }

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value });
  }

  const handleUserModal = () => {
    setUserModal(!userModal);
  }

  const onCreate = () => {
    const data = { first_name, last_name, email, phone };
    dispatch(createUser(data));
  }

  useEffect(() => {
    if (create_success) {
      setValues({
        first_name: "",
        last_name: "",
        email: "",
        phone: ""
      });
      setUserModal(false);
    }
  }, [ create_success ]);

  return (
    <div>
      {list_loading ?
        <div className="question-loader">
          <Spinner style={{ width: "100px", height: "100px"}} className="my-loader">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div> : 
        <Row>
          <Col xs="12" sm="12" md="12">
            
            <Card className="mt-4 questions-card">
              <CardBody>
                <div className="header-dev">
                  <h2>User List</h2>
                  <Button onClick={handleUserModal}>Create New Question</Button>
                </div>
                <Table responsive hover>
                  <thead className="th">
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Interview</th>
                    <th>Delete</th>
                  </thead>
                  <tbody>
                    {docs?.length ? docs.map(u => (
                      <tr key={u._id}>
                        <td>{u?.first_name}</td>
                        <td>{u?.last_name}</td>
                        <td>{u?.email}</td>
                        <td>{u?.phone}</td>
                        <td className="assign">
                          <BsPencilSquare onClick={() => handleModalToggle(u?._id)} className="icon-update" />
                        </td>
                        <td className="icon-td">
                          {/* <BsPencilSquare onClick={() => handleModalToggle(u?._id)} className="icon-update" /> {""} */}
                          {delete_loading ? 
                            <Spinner>
                              <span className="visually-hidden">Loading...</span>
                            </Spinner> : 
                            <FaTrash onClick={() => onDelete(u?._id)} className="icon-delete" />
                          }
                        </td>
                      </tr>
                    )) : <div className="no-data"></div>}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
            {/* <UserQuestion 
              time={time} 
              setTime={setTime} 
              handleQuestions={handleQuestions}
              docs={docs}
              modal={modal}
              questions={questionList && questionList.questions?.docs}
              toggle={toggle}
              handleCreate={handleCreate}
              assign_loading={assign_loading}
              assign_success={assign_success}
            /> */}
            <NewUser
              first_name={first_name}
              last_name={last_name}
              email={email}
              phone={phone}
              handleChange={handleChange}
              userModal={userModal}
              handleUserModal={handleUserModal}
              onCreate={onCreate}
              create_loading={create_loading}
            />
          </Col>
        </Row>
      }
    </div>
  )
}

export default UserManagement;