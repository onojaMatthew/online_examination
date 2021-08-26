import { Button } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { Col, Row, Table, Spinner, Card, CardBody } from "reactstrap";
import { getQuestionList } from "../../../../store/actions/actions_dashboard_data";

import "./Question.css";

const Question = () => {
  const dispatch = useDispatch();
  const { questions, list_loading, list_success, question } = useSelector(state => state.dashboard_data);
  const { page, totalPages, nextPage, prevPage, docs } = questions;

  useEffect(() => {
    dispatch(getQuestionList());
  }, [ dispatch ]);



  return (
    <div>
      <Row>
        <Col xs="12" sm="12" md="12">
          <Card className="mt-4 questions-card">
            <CardBody>
              <div className="header-dev">
                <h2>Question List</h2>
                <Button>Set New Question</Button>
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
                  <div className="spin">
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
                        
                        <BsPencilSquare className="icon-update" /> {""}<FaTrash className="icon-delete" />
                      </td>
                    </tr>
                  )) : <div className="no-data"></div>}
                </tbody>
              </Table>
            </CardBody>
          </Card>
          
        </Col>
      </Row>
    </div>
  )
}

export default Question;