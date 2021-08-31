import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalHeader, Modal, ModalBody, ModalFooter, Input } from "reactstrap";
import { Button } from "antd";
import { createRandomQuestions } from "../../../../store/actions/actions_user";

import "./Question.css";

const RandomQuestions = ({ questions, randomModal, toggleRandomModal }) => {
  const dispatch = useDispatch();
  const [ random_number, setRandom ] = useState("");
  const [ question, setQuestions ] = useState([]); 
  const [ errMsg, setErrMsg ] = useState("");
  const { random, random_loading, random_success, error } = useSelector(state => state.user);
  const { docs } = questions

  const handleChange = (e) => {
    setErrMsg("");
    const { value } = e.target;
    const findx = question.includes(value)
    if (!findx) {
      const questn = [...question, e.target.value]
      setQuestions(questn);
    } else if (e.target.checked === false) {
      let que = question;
      const index = que.indexOf(value);
      que.splice(index, 1);
      setQuestions(que)
    }
  }

  const handleRandomCount = (e) => {
    setErrMsg("")
    setRandom(e.target.value)
  }

  const handleSubmit = () => {
    if (!random_number){
      setErrMsg("Random count must be provided");
      return;
    }
    const data = { questions: question, randomCount: random_number };

    dispatch(createRandomQuestions(data));
  }

  useEffect(() => {
    if (random_success) {
      window.location.href = "/dashboard/assign_question";
    }
  }, [ random_success ]);

  console.log(random, question)
  return (
    <div className="random-container">
      <Modal isOpen={randomModal} toggle={toggleRandomModal} id="new-question-modal">
        <ModalHeader toggle={toggleRandomModal} id="modal-header">Randomize Questions</ModalHeader>
        <ModalBody>
          {docs && docs.length > 0 ? docs.map((q, i) => (
            <div className="random-list">
              <Input type="checkbox" onChange={(e) => handleChange(e)} value={q._id} /> {q?.question}
            </div>
          )) : <h3 className="text-center mt-5">No Questions</h3>}
          <div className="random">
            <Input value={random_number} onChange={(e) => handleRandomCount(e)} placeholder="Random count" />
          </div>

          {random_loading ? <Button className="submit-button" loading>Processing...</Button> : 
          <Button className="random-button" color="primary" onClick={handleSubmit}>Submit</Button>}
        </ModalBody>
      </Modal>
    </div>
  )
}

export default RandomQuestions;