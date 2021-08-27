import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { Col, Row, Table, Spinner, Card, CardBody } from "reactstrap";

import "../Question/Question.css";
import { deleteUser, getUserList } from "../../../../store/actions/actions_user";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, list_loading, delete_loading } = useSelector(state => state.user);
  const { docs } = users;
  const [ modal, setModal ] = useState(false);

  useEffect(() => {
    dispatch(getUserList());
  }, [ dispatch ]);

  const onDelete = (id) => {
    dispatch(deleteUser(id));
  }

  const toggle = () => {
    setModal(!modal);
  }

  const handleToggleCreate = () => {}

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
                  <h2>Question List</h2>
                  <Button onClick={handleToggleCreate}>Set New Question</Button>
                </div>
                <Table responsive hover>
                  <thead className="th">
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </thead>
                  <tbody>
                    {docs?.length ? docs.map(u => (
                      <tr key={u._id}>
                        <td>{u?.first_name}</td>
                        <td>{u?.last_name}</td>
                        <td>{u?.email}</td>
                        <td>{u?.phone}</td>
                        <td>{u?.optionC}</td>
                        <td>{u?.optionD}</td>
                        <td>{u?.optionE}</td>
                        <td className="icon-td">
                          <BsPencilSquare onClick={toggle} className="icon-update" /> {""}{delete_loading ? 
                          <Spinner>
                            <span className="visually-hidden">Loading...</span>
                          </Spinner> : <FaTrash onClick={() => onDelete(u?._id)} className="icon-delete" />}
                        </td>
                      </tr>
                    )) : <div className="no-data"></div>}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
            {/* <NewQuestion
              question={question}
              answer={answer}
              optionA={optionA}
              optionB={optionB}
              optionC={optionC}
              optionD={optionD}
              optionE={optionE}
              modal={modal}
              toggle={toggle}
              answerFile={answerFile}
              optionAFile={optionAFile}
              optionBFile={optionBFile}
              optionCFile={optionCFile}
              optionDFile={optionDFile}
              optionEFile={optionEFile}
              handleChange={handleChange}
              handleNewQuestion={handleNewQuestion}
              create_loading={create_loading}
              handleFileChange={handleFileChange}
            /> */}
          </Col>
        </Row>
      }
    </div>
  )
}

export default UserManagement;