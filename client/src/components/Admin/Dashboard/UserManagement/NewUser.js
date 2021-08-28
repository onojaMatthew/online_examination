import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Input } from "reactstrap";
import { Button } from "antd";

import "./User.css";

export const NewUser = ({
  handleUserModal,
  userModal,
  phone,
  last_name,
  first_name,
  email,
  create_loading,
  handleChange,
  onCreate
}) => {
  return (
    <div>
      <Modal isOpen={userModal} toggle={handleUserModal} id="new-question-modal">
        <ModalHeader toggle={handleUserModal} id="modal-header">New User</ModalHeader>
        <ModalBody>
          <div className="input-wrapper">
            <label htmlFor="first_name">First Name</label>
            <Input id="first_name" name="first_name" value={first_name} onChange={(e) => handleChange(e)} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="last_name">Last Name</label>
            <Input id="last_name" name="last_name" value={last_name} onChange={(e) => handleChange(e)} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <Input id="email" name="email" value={email} onChange={(e) => handleChange(e)} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="phone">Phone Number</label>
            <Input onClick={(e) => e.key === "Enter" ? onCreate() : null} id="phone" name="phone" value={phone} onChange={(e) => handleChange(e)} />
          </div>
        </ModalBody>
        <ModalFooter>
          {create_loading ? <Button className="submit-button" loading>Processing...</Button> : 
          <Button className="submit-button" color="primary" onClick={onCreate}>Submit</Button>}
          {" "}<Button className="cancel-button" color="secondary" onClick={handleUserModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default NewUser;