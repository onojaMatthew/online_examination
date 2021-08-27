import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Input } from "reactstrap";
import { Button } from "antd";

const UserQuestion = ({
  toggle,
  modal
}) => {

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} id="new-question-modal">
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          
        </ModalBody>
        <ModalFooter>
          {/* {create_loading ? <Button className="submit-button" loading>Processing...</Button> : 
          <Button className="submit-button" color="primary" onClick={handleNewQuestion}>Submit</Button>}
          {" "}<Button className="submit-button" color="secondary" onClick={toggle}>Cancel</Button> */}
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default UserQuestion;