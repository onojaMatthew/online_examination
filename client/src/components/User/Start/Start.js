import { Button } from "antd";
import React, { useEffect, useState } from "react";
import Auth from "../../../helper/Auth";
import { useDispatch, useSelector } from "react-redux";
import { Container, Col, Row } from "reactstrap";
import { getQuestions } from "../../../store/actions/actions_user";
import "./Start.css";

const Start = () => {
  const dispatch = useDispatch();
  const { questions, questionLoading, error } = useSelector(state => state.user);
  const [ userQuestions, setUserQuestions ] = useState([]);
  const [ countDown, setCountDown ] = useState("120min");
  const [ num, setNum ] = useState(0);
  const [ toggle, setToggle ] = useState(false);
  const [ token, setToken ] = useState({});
  const [ currentQuestion, setCurrentQuestion ] = useState({});
  const [ userAnswer, setUserAnswer ] = useState({ "ans": "", "question": "" });
  const [ answer, setAnswer ] = useState("");

  useEffect(() => {
    setToken(JSON.parse(Auth.getToken()));
  }, []);

  useEffect(() => {
    if (token && token._id) {
      dispatch(getQuestions(token && token._id));
    }
  }, [ dispatch, token ]);

  useEffect(() => {
    if (questions) {
      setUserQuestions(questions?.questions)
    }
  }, [ questions ]);

  useEffect(() => {
    setCurrentQuestion(userQuestions[num]);
  }, [ num ]);

  useEffect(() => {
    setUserAnswer({ ...userAnswer, "ans": answer, "question": currentQuestion?._id });
  }, [ currentQuestion, answer ]);

  console.log(currentQuestion, " the question")

  return (
    <div className="start-container">
      <Container>

        {toggle ? (<Row>
          <Col xs="12" sm="12" md="12" lg={{ size: 4, offset: 4 }} xl={{ size: 4, offset: 4 }}>
            <h2>Click the button below to </h2>
            <p>{currentQuestion && currentQuestion && currentQuestion.question?.question}</p>
            <p>{currentQuestion && currentQuestion.question && currentQuestion.question.optionA ? "A " : null} {currentQuestion && currentQuestion.question?.optionA}</p>
            <p>{currentQuestion && currentQuestion.question && currentQuestion.question.optionA ? "B " : null} {currentQuestion && currentQuestion.question?.optionB}</p>
            <p>{currentQuestion && currentQuestion.question && currentQuestion.question.optionA ? "C " : null} {currentQuestion && currentQuestion.question?.optionC}</p>
            <p>{currentQuestion && currentQuestion.question && currentQuestion.question.optionA ? "D " : null} {currentQuestion && currentQuestion.question?.optionD}</p>
            <p>{currentQuestion && currentQuestion.question && currentQuestion.question.optionA ? "E " : null} {currentQuestion && currentQuestion.question?.optionE}</p>
            <div>
              <Button onClick={() => setNum(num + 1)}>Next question</Button>
            </div>
          </Col>
        </Row>) : 
        <Row>
          <Col xs="12" sm="12" md="12" lg={{ size: 4, offset: 4 }} xl={{ size: 4, offset: 4 }}>
            <h2>Click the button below to </h2>
            <div>
              <Button onClick={() => setToggle(true)}>Start Test</Button>
            </div>
          </Col>
        </Row>}
        
      </Container>
    </div>
  )
}

export default Start;