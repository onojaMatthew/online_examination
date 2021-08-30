import React, { useEffect, useState } from "react";
import { Row, Col, Modal, ModalBody, ModalHeader, ModalFooter, Input, Card, CardBody, CardHeader, Spinner } from "reactstrap";
import { Button } from "antd";
import "./User.css"
import { useDispatch, useSelector } from "react-redux";
import { getShuffledQuestions, getUserList } from "../../../../store/actions/actions_user";
import { getQuestionList } from "../../../../store/actions/actions_dashboard_data";

const UserQuestion = ({
  toggle,
  modal,
  time,
  setTime,
  // assign_loading,
  // questions,
  // handleCreate,
  // assign_success
}) => {
  const dispatch = useDispatch();
  const [ values, setQuestions ] = useState([{ user: "", randomQuestion: "" }]);
  const { users: { docs }, questions, list_loading, assign_success, assign_loading } = useSelector(state => state.user);
  const [ selectedUser, setSelectedUser ] = useState("");
  const [ selectedQuestions, setSelectedQuestion ] = useState("");

  const questionArr = [{ user: "", randomQuestion: "" }];

  useEffect(() => {
    dispatch(getUserList());
    dispatch(getShuffledQuestions());
  }, [ dispatch ]);

  const handleQuestions = (e) => {
    const { value } = e.target;
    const findx = values.includes(value)
    if (!findx) {
      const questn = [...values, e.target.value]
      setQuestions(questn);
    } else if (e.target.checked === false) {
      let que = values;
      const index = que.indexOf(value);
      que.splice(index, 1);
      setQuestions(que)
    }
  }

  const handleCreate = () => {
    // const data = { questions, user: userId, time: time };
    // dispatch(assingQuestions(data));
  }

  const onSelectUser = (e) => {
    const { value } = e.target;
    setSelectedUser(value);
  }

  const onSelectQuestion = (e) => {
    const { value } = e.target;
    setSelectedQuestion(value);
  }

  useEffect(() => {
    let isQuestion;
    if (selectedQuestions.length > 0) {
      let userIndex = values.findIndex(u => { return u.user === selectedUser });
      if (userIndex) {
        isQuestion = values[userIndex].randomQuestion === selectedQuestions;
      }

      if (isQuestion)  return;
      // const que = values[userIndex].randomQuestion = selectedQuestions;
      let newQuestion = [...values, { randomQuestion: selectedQuestions }];
      setQuestions(newQuestion)
    }
  }, [ selectedQuestions ]);

  useEffect(() => {
    let isUser;
    if (selectedUser.length > 0) {
      let questionIndex = values.findIndex(u => { return u.randomQuestion === selectedQuestions });
      if (questionIndex) {
        isUser = questionArr[questionIndex].user === selectedUser;
      }
  
      if (isUser)  return;
      const user = questionArr[questionIndex].user = selectedUser;
      let newQuestion = [...values, { user: selectedUser }];
      setQuestions(newQuestion);
    }
  }, [ selectedUser ]);

  console.log(values, " the quesions");
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
                    <Input type="checkbox" onChange={(e) => onSelectQuestion(e)} value={q?._id} /> <span>{`Question ${i}`}</span>
                  </div>
                )) : <h3>No Question Records yet</h3>}
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="12" lg="6" xl="6">
                <div className="mt-4">
                  <label htmlFor="time">Interview Duration</label>
                  <Input id="time" value={time} onChange={(e) => setTime(e.target.value)} placeholder="30mins" />
                </div>
              </Col>
            </Row>
            
            {assign_loading ? <Button className="submit-button" loading>Processing...</Button> : 
              <Button className="submit-button" color="primary" onClick={handleCreate}>Submit</Button>}
            {" "}<Button className="cancel-button" color="secondary" onClick={toggle}>Cancel</Button>
          </CardBody>
        </Card>
      )}
    </div>
  )
}

export default UserQuestion;