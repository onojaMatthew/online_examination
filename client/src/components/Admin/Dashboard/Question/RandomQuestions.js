import React from "react";
import { useSelector } from "react-redux";
import { ModalHeader, Modal, ModalBody, ModalFooter, Input } from "reactstrap";
import { Button } from "antd";

const RandomQuestions = ({ questions, randomModal, toggleRandomModal }) => {
  console.log(questions, " the question inside modal")
  return (
    <div>
      <Modal isOpen={randomModal} toggle={toggleRandomModal} id="new-question-modal">
        <ModalHeader toggle={toggleRandomModal} id="modal-header">Randomize Questions</ModalHeader>
        <ModalBody>
          
        </ModalBody>
        <ModalFooter>
          {/* {create_loading ? <Button className="submit-button" loading>Processing...</Button> : 
          <Button className="submit-button" color="primary" onClick={handleNewQuestion}>Submit</Button>}
          {" "}<Button className="cancel-button" color="secondary" onClick={toggle}>Cancel</Button> */}
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default RandomQuestions;