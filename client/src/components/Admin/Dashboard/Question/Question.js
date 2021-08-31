import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { Col, Row, Table, Spinner, Card, CardBody } from "reactstrap";
import { getQuestionList, deleteQuestion, createQuestion } from "../../../../store/actions/actions_dashboard_data";

import "./Question.css";
import NewQuestion from "./NewQuestion";
import { uploader } from "../../../../store/actions/actions_upload";

const Question = () => {
  const dispatch = useDispatch();
  const { upload, upload_loading, upload_success } = useSelector(state => state.upload);
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
    setValues({ question: "", answer: "", optionA: "", optionB: "", optionC: "", optionD: "", optionE: "" });
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

  useEffect(() => {
    if (create_loading) {
      setValues({ question: "", answer: "", optionA: "", optionB: "", optionC: "", optionD: "", optionE: "" });
    }
  }, [ create_loading ]);

  useEffect(() => {
    if (answerFile) {
      dispatch(uploader(answerFile))
    } else if (optionAFile) {
      dispatch(uploader(optionAFile))
    } else if (optionBFile) {
      dispatch(uploader(optionBFile))
    } else if (optionCFile) {
      dispatch(uploader(optionCFile))
    } else if (optionDFile) {
      dispatch(uploader(optionDFile))
    } else if (optionEFile) {
      dispatch(uploader(optionEFile))
    }
  }, [ dispatch, answerFile, optionAFile, optionBFile, optionCFile, optionDFile, optionEFile ]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "answerFile") {
      setAnswerFile(files[0])
      setoptionAFile("")
      setoptionBFile("")
      setoptionCFile("")
      setoptionDFile("")
      setoptionEFile("")
    } else if (name === "optionAFile") {
      setoptionAFile(files[0])
      setAnswerFile("files[0]")
      setoptionBFile("")
      setoptionCFile("")
      setoptionDFile("")
      setoptionEFile("")
    } else if (name === "optionBFile") {
      setoptionBFile(files[0])
      setAnswerFile("")
      setoptionAFile("")
      setoptionCFile("")
      setoptionDFile("")
      setoptionEFile("")
    } else if (name === "optionCFile") {
      setoptionCFile(files[0])
      setAnswerFile("")
      setoptionAFile("")
      setoptionBFile("")
      setoptionDFile("")
      setoptionEFile("")
    } else if (name === "optionDFile") {
      setoptionDFile(files[0]);
      setAnswerFile("")
      setoptionAFile("")
      setoptionBFile("")
      setoptionCFile("")
      setoptionEFile("")
    } else if (name === "optionEFile") {
      setoptionEFile(files[0]);
      setAnswerFile("")
      setoptionAFile("")
      setoptionBFile("")
      setoptionCFile("")
      setoptionDFile("")
    }
  }

  useEffect(() => {
    if (upload_success && answerFile) {
      setValues({...values, answer: upload.upload && upload.upload.secure_url })
    } else if (upload_success && optionAFile) {
      setValues({...values, optionA: upload.upload && upload.upload.secure_url })
    } else if (upload_success && optionBFile) {
      setValues({...values, optionB: upload.upload && upload.upload.secure_url })
    } else if (upload_success && optionCFile) {
      setValues({...values, optionC: upload.upload && upload.upload.secure_url })
    } else if (upload_success && optionDFile) {
      setValues({...values, optionD: upload.upload && upload.upload.secure_url })
    } else if (upload_success && optionEFile) {
      setValues({...values, optionE: upload.upload && upload.upload.secure_url })
    }
  }, [ upload_success, upload, values, upload_loading, answerFile, optionAFile, optionBFile, optionCFile, optionDFile, optionEFile])

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
            handleFileChange={handleFileChange}
          />
        </Col>
      </Row>
    </div>
  )
}

export default Question;