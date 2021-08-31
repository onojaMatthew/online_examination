import { Button } from "antd";
import React, { useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { Col, Row, Table, Spinner, Card, CardBody } from "reactstrap";
import { getUserSolution } from "../../../../store/actions/actions_user";

const UserSolution = () => {
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector(state => state.user);
  const match = useRouteMatch();
  const history = useHistory();
  const handleQuestionList = () => {}

  useEffect(() => {
    // const { params: { id }} = match;
    if (match.params && match.params.id.length > 0) {
      dispatch(getUserSolution(match.params.id));
    }
  }, [ dispatch ]);

  console.log(history, " the question")

  return (
    <div>
      {loading ? (
        <div className="question-loader">
          <Spinner style={{ width: "100px", height: "100px"}} className="my-loader">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div> 
      ) : (
        <Row>
          <Col xs="12" sm="12" md="12">
            <Card className="mt-4 questions-card">
              <CardBody>
                <div className="header-dev">
                  <h2>Question List</h2>
                  <Button onClick={handleQuestionList}>Set New Question</Button>
                </div>
                <Table responsive hover>
                  <thead className="th">
                    <th>Question</th>
                    <th>Answer</th>
                    <th>User Answer</th>
                    <th>Option A</th>
                    <th>Option B</th>
                    <th>Option C</th>
                    <th>Option D</th>
                    <th>Option E</th>
                  </thead>
                  <tbody>
                    {questions.questions?.length ? questions.questions.map(d => (
                      <tr>
                        <td>{d?.question}</td>
                        <td>{d?.answer}</td>
                        <td>{d?.user_answer}</td>
                        <td>{d?.optionA}</td>
                        <td>{d?.optionB}</td>
                        <td>{d?.optionC}</td>
                        <td>{d?.optionD}</td>
                        <td>{d?.optionE}</td>
                        
                      </tr>
                    )) : <div className="no-data"></div>}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
      
    </div>
  )
}

export default UserSolution;