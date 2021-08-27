import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { Col, Row, Table, Spinner, Card, CardBody } from "reactstrap";
import { getQuestionList, deleteQuestion, createQuestion } from "../../../../store/actions/actions_dashboard_data";

import "./Question.css";
import NewQuestion from "./NewQuestion";

const Question = () => {
  const dispatch = useDispatch();
  const [ modal, setModal ] = useState(false);
  const { questions, list_loading, delete_loading, create_loading } = useSelector(state => state.dashboard_data);
  const { docs } = questions;
  // page, totalPages, nextPage, prevPage, 
  const [ answerFile, setAnswerFile ] = useState({});
  const [ optionAFile, setoptionAFile ] = useState({});
  const [ optionBFile, setoptionBFile ] = useState({});
  const [ optionCFile, setoptionCFile ] = useState({});
  const [ optionDFile, setoptionDFile ] = useState({});
  const [ optionEFile, setoptionEFile ] = useState({});
  const [ values, setValues ] = useState({ question: "", answer: "", optionA: "", optionB: "", optionC: "", optionD: "", optionE: "" });

  const { question, answer, optionA, optionB, optionC, optionD, optionE } = values;

  useEffect(() => {
    dispatch(getQuestionList());
  }, [ dispatch ]);

  const onDelete = (id) => {
    const data = { id }
    dispatch(deleteQuestion(data));
  }

  const toggle = () => {
    setModal(!modal);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value });
  }

  const handleToggleCreate = () => {
    setValues({ question: "", answer: "", optionA: "", optionB: "", optionC: "", optionD: "", optionE: "" });
    setModal(true);
  }

  const handleNewQuestion = () => {
    const data = { question, answer, optionA, optionB, optionC, optionD, optionE };
    dispatch(createQuestion(data));
  }

  return (
    <div>
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
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Option A</th>
                  <th>Option B</th>
                  <th>Option C</th>
                  <th>Option D</th>
                  <th>Option E</th>
                  <th>Action</th>
                </thead>
                <tbody>
                {list_loading ?
                  <div className="question-loader">
                    <Spinner className="my-loader">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div> : docs?.length ? docs.map(d => (
                    <tr>
                      <td>{d?.question}</td>
                      <td>{d?.answer}</td>
                      <td>{d?.optionA}</td>
                      <td>{d?.optionB}</td>
                      <td>{d?.optionC}</td>
                      <td>{d?.optionD}</td>
                      <td>{d?.optionE}</td>
                      <td className="icon-td">
                        <BsPencilSquare onClick={toggle} className="icon-update" /> {""}{delete_loading ? 
                        <Spinner>
                          <span className="visually-hidden">Loading...</span>
                        </Spinner> : <FaTrash onClick={() => onDelete(d?._id)} className="icon-delete" />}
                      </td>
                    </tr>
                  )) : <div className="no-data"></div>}
                </tbody>
              </Table>
            </CardBody>
          </Card>
          <NewQuestion
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
          />
        </Col>
      </Row>
    </div>
  )
}

export default Question;