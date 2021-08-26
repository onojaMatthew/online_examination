import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import Auth from "../../../helper/Auth";
import { Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {  Col, Row, Input, Spinner } from "reactstrap";
import { getQuestions, submitSolution } from "../../../store/actions/actions_user";
import Icon from "../../../assets/images/employee.jpg";
import "./Start.css";

const Start = () => {
  const dispatch = useDispatch();
  const { questions, questionLoading, solutionLoading, solutionSuccess, error } = useSelector(state => state.user);
  // const [ time, setTime ] = useState(0);
  const [ userQuestions, setUserQuestions ] = useState([]);
  const [ time, setTime ] = useState(0);
  const [ counter, setCounter ] = useState("");
  const [ num, setNum ] = useState(0);
  const [ toggle, setToggle ] = useState(false);
  const [ modal, setModal ] = useState(false);
  const [ token, setToken ] = useState({});
  const [ currentQuestion, setCurrentQuestion ] = useState({});
  const [ userAnswer, setUserAnswer ] = useState([{ "ans": "", "question": "" }]);
  const [ start, setStart ] = useState(false);
  const history = useHistory();
  const match = useRouteMatch()

  let timeoutHandle;

  const url = match && match.url.split("/").slice(1)
  url.pop()
  const path = url.join("/");

  useEffect(() => {
    setToken(JSON.parse(Auth.getToken()));
    const has_submitted = localStorage.getItem("has_submitted");
    if (questions && questions.completed) {
      window.location.href = `/${path}/complete`;
    }
  }, []);

  useEffect(() => {
    if (token && token._id) {
      dispatch(getQuestions(token && token._id));
    }
  }, [ dispatch, token ]);

  useEffect(() => {
    if (questions) {
      const min = questions.time && Number(questions.time.split(/([0-9]+)/)[1]);
      setUserQuestions(questions?.questions)
      setTime(min);
    }
  }, [ questions ]);

  useEffect(() => {
    setCurrentQuestion(userQuestions[num]);
  }, [ num ]);

  const handleToggle = () => {
    setToggle(true);
    setNum(1);
    setStart(true);
  }

  const handleChange = (e, id) => {
    const { value, name } = e.target
    let newArr = [...userAnswer, { ans: value, question: id }];
    setUserAnswer(newArr);
  }

  function countdown(minutes) {
    let seconds = 60;
    let mins = minutes

    function tick() {
      setTime(time - 1);
      let current_minutes = mins - 1
      seconds--;
      setCounter(current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds))
      if (seconds > 0) {
        timeoutHandle = setTimeout(tick, 1000);
      } else {

        if (mins > 1) {

          setTimeout(function() {
            countdown(mins - 1);
          }, 1000);

        }
      }
    }
    tick();
  }

  useEffect(() => {
    if (start) {
      countdown(time && time);
    }
  }, [ start ]);

  const handleSubmit = () => {
    const data = {
      user: token && token._id,
      qxns: userAnswer
    };
    dispatch(submitSolution(data));
  }

  useEffect(() => {
    if (solutionSuccess) {
      toggleModal();
      localStorage.setItem("has_submitted", true);
      setTimeout(() => {
        history.push(`/${path}/complete`);
      }, 5000);
    }
  }, [ solutionSuccess ]);

  const toggleModal = () => {
    setModal(true);
  }

  console.log(questions)

  return (
    <div>
      <Row>
        <Col xs="12" sm="12" md="12" lg="4" xl="4" className="start-left-cont">
          <h3 className="text-center">Welcome to XYZ Test</h3>
          <Row className="mt-5">
            <Col xs="6" sm="6" md="6" lg="6" xl="6">
              <p className="questn-no">No. of questions</p>
              <p className="questn-no">{userQuestions && userQuestions.length}</p>
            </Col>
            <Col xs="6" sm="6" md="6" lg="6" xl="6">
              <p>Test duration</p>
              <p><strong>{counter.length > 0 ? counter : `${time}:00 mins left`}</strong></p>
            </Col>
          </Row>  
          <Row className="text-center pl-5">
            <Col className="pl-5" xs="6" sm="6" md="6" lg="6" xl="6">
              <Image src={Icon} preview={false} width={300} />
            </Col>
          </Row>   
        </Col>
        <Col xs="12" sm="12" md="12" lg="8" className="instruction-right-cont">
          {toggle ? (
            questionLoading ? (
              <div className="text-center">
                <Spinner>
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) :
          <Row>
            <Col xs="12" sm="12" md="12" lg="12" xl="12">
              <h3 className="text-center">Question {" "}{currentQuestion && currentQuestion.question && currentQuestion.question.optionA ? num : null}</h3>
              <p className="question"> 
              {currentQuestion && currentQuestion && currentQuestion.question?.question}</p>
              <p>
                <Input 
                  value={"optionA"} 
                  type="radio" 
                  onChange={(e) => handleChange(e,currentQuestion.question._id)} 
                  name={`${currentQuestion && currentQuestion.question?.question}`} />{"  "}{currentQuestion && currentQuestion.question && currentQuestion.question.optionA ? "A " : null}{" "} 
                  {currentQuestion && currentQuestion.question?.optionA}
              </p>
              <p>
                <Input 
                  type="radio"
                  value="optionB" 
                  onChange={(e) => handleChange(e,currentQuestion.question._id,)} 
                  name={`${currentQuestion && currentQuestion.question?.question}`}/>{"  "}
                  {currentQuestion && currentQuestion.question && currentQuestion.question.optionA ? "B " : null}{" "} 
                  {currentQuestion && currentQuestion.question?.optionB}
              </p>
              <p>
                <Input 
                  value="optionC" 
                  type="radio" 
                  onChange={(e) => handleChange(e,currentQuestion.question._id)} 
                  name={`${currentQuestion && currentQuestion.question?.question}`}/>{"  "}{currentQuestion && currentQuestion.question && currentQuestion.question.optionA ? "C " : null}{" "} 
                  {currentQuestion && currentQuestion.question?.optionC}
              </p>
              <p>
                <Input 
                  value="optionD" 
                  type="radio" 
                  onChange={(e) => handleChange(e,currentQuestion.question._id)} 
                  name={`${currentQuestion && currentQuestion.question?.question}`}/>{"  "}{currentQuestion && currentQuestion.question && currentQuestion.question.optionA ? "D " : null}{" "} 
                  {currentQuestion && currentQuestion.question?.optionD}</p>
              <p>
                <Input 
                  value="optionE" 
                  type="radio" 
                  onChange={(e) => handleChange(e,currentQuestion.question._id)} 
                  name={`${currentQuestion && currentQuestion.question?.question}`}/>{"  "}{currentQuestion && currentQuestion.question && currentQuestion.question.optionA ? "E " : null}{" "} 
                  {currentQuestion && currentQuestion.question?.optionE}
              </p>
              <div className="mt-5">
                {num === userQuestions.length - 1 ? 
                  <Button className="question-next-btn" onClick={handleSubmit}>Submit your answers</Button> : solutionLoading && num === userQuestions.length - 1 ? 
                  <Button className="question-next-btn" loading>Processing...</Button> :
                  <Button className="question-next-btn" onClick={() => setNum(num + 1)}>Next question</Button>
                }
              </div>
            </Col>
          </Row>) : 
          <Row>
            <Col xs="12" sm="12" md="12" lg="12" xl="12">
              <h4>You're all set to start the test. Click the button below to start</h4>
              <div className="mt-5">
                <Button className="start-btn" onClick={handleToggle}>Start Test</Button>
              </div>
            </Col>
          </Row>}
        </Col>
      </Row> 
    </div>
  )
}

export default Start;