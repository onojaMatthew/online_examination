import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Table } from "reactstrap";
import { getQuestions } from "../../../../store/actions/actions_user";

import "./Question.css";

const Question = () => {
  const dispatch = useDispatch();
  const { questions } = useSelector(state => state.question);

  useEffect(() => {
    dispatch(getQuestions());
  }, [ dispatch ]);

  console.log(questions && questions)
  return (
    <div>
      <h2>Question List</h2>
      <Row>
        <Col xs="12" sm="12" md="12">
          <Table responsive>
            <thead>
              <th>Question</th>
              <th>Answer</th>
              <th>Option A</th>
              <th>Option B</th>
              <th>Option C</th>
              <th>Option D</th>
              <th>Option E</th>
            </thead>
            <tbody>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  )
}

export default Question;