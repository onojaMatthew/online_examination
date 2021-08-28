import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Input } from "reactstrap";
import { Button } from "antd";

const UserQuestion = ({
  toggle,
  modal,
  time,
  setTime,
  handleQuestions,
  assign_loading,
  questions,
  handleCreate,
  assign_success
}) => {

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} id="new-question-modal">
        <ModalHeader toggle={toggle}>Assign Interview Questions</ModalHeader>
        {assign_success ?<p style={{ color: "green", textAlign: "left"}}>Operation success!!</p> : null}
        <ModalBody>
          {questions && questions.map(q => (
            <div>
              <Input type="checkbox" onChange={(e) => handleQuestions(e)} value={q?._id} /> <span>{q?.question}</span>
            </div>
          ))}
          <div className="mt-4">
            <label htmlFor="time">Interview Duration</label>
            <Input id="time" value={time} onChange={(e) => setTime(e.target.value)} placeholder="30mins" />
          </div>
        </ModalBody>
        <ModalFooter>
          {assign_loading ? <Button className="submit-button" loading>Processing...</Button> : 
          <Button className="submit-button" color="primary" onClick={handleCreate}>Submit</Button>}
          {" "}<Button className="cancel-button" color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default UserQuestion;