import React, { useEffect, useState } from "react";
import { Row, Col,  Input, Card, CardBody, Spinner, Alert } from "reactstrap";
import { Button, message } from "antd";
import "./User.css"
import { useDispatch, useSelector } from "react-redux";
import { assignQuestions, getShuffledQuestions, getUserList } from "../../../../store/actions/actions_user";

const UserQuestion = () => {
  const dispatch = useDispatch();
  const [ values, setQuestions ] = useState([{ user: "", randomQuestion: "" }]);
  const { users: { docs }, questions, list_loading, assign_success, assign_loading, error } = useSelector(state => state.user);
  const [ selectedUser, setSelectedUser ] = useState("");
  const [ selectedQuestions, setSelectedQuestion ] = useState("");
  const [ errMsg, setErrMsg ] = useState("");
  const [ updated, setUpdated ] = useState(false);
  const [ time, setTime ] = useState("");

  useEffect(() => {
    dispatch(getUserList());
    dispatch(getShuffledQuestions());
  }, [ dispatch ]);

  const handleCreate = () => {
    let real_questions = [...values];
    real_questions.shift();
    const data = { questions: real_questions, time: time };
    if (!time) {
      setErrMsg("Please specify test duration");
      return;
    }
    dispatch(assignQuestions(data));
  }

  const onSelectUser = (e) => {
    const { value } = e.target;
    setErrMsg("")
    setSelectedUser(value);
  }

  const onSelectQuestion = (e) => {
    if (e.target.checked === false) return;
    const { value } = e.target;
    setSelectedQuestion(value);
  }

  useEffect(() => {
    if (selectedQuestions.length > 0) {
      let newQuestion = [...values, { user: selectedUser, randomQuestion: selectedQuestions }];
      setQuestions(newQuestion);
      setUpdated(true);
    }
  }, [ selectedQuestions, selectedUser ]);

  useEffect(() => {
    if (updated) {
      setSelectedQuestion("");
      setSelectedUser("");
      setUpdated(false)
    }
  }, [ updated ]);

  useEffect(() => {
    if (assign_success) {
      message.success("Questions assigned successfully");
    }
  }, [ assign_success ]);

  const handleTime = (e) => {
    setErrMsg("");
    setTime(e.target.value);
  }

  useEffect(() => {
    if (error && error.length > 0) {
      setErrMsg(error);
    }
  }, [ error ]);

  console.log(values, " the values")

  return (
    <div>
      {list_loading ? (
        <div className="spin">
        <Spinner className="my-loader">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div> 
      ) : (
        <Card className="question_assign_card">
          <CardBody>
            <h3>Assign Questions</h3>
            {errMsg.length > 0 ? <Alert color="danger">{errMsg}</Alert> : null}
            <Row>
              <Col xs="6" sm="6" md="6" lg="6" xl="6">
                {docs && docs.length > 0 ? docs.map((user, i) => (
                  <div key={i} className="input-container">
                    <Input type="checkbox" onChange={(e) => onSelectUser(e)} value={user._id} /> {user?.first_name} {user?.last_name}
                  </div>
                )) : <h3>No User Records</h3>}
              </Col>
              <Col xs="6" sm="6" md="6" lg="6" xl="6">
                {questions && questions.length > 0 ? questions.map((q, i) => (
                  <div key={i} className="question-container">
                    <Input type="checkbox" onChange={(e) => onSelectQuestion(e)} value={q?._id} /> <span>{`Question type ${i + 1}`}</span>
                  </div>
                )) : <h3>No Question Records yet</h3>}
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="12" lg="6" xl="6">
                <div className="mt-4">
                  <label htmlFor="time">Interview Duration</label>
                  <Input value={time} onChange={(e) => handleTime(e)} />
                </div>
              </Col>
            </Row>
            {assign_loading ? <Button className="submit-button" loading>Processing...</Button> : 
              <Button className="submit-button" color="primary" onClick={handleCreate}>Submit</Button>}
            {" "}<Button className="cancel-button" color="secondary">Cancel</Button>
          </CardBody>
        </Card>
      )}
    </div>
  )
}

export default UserQuestion;