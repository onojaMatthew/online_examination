import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Input } from "reactstrap";
import { Button } from "antd";
import { BsChevronDown } from "react-icons/bs";
import "./Question.css";

const NewQuestion = ({ 
  handleChange, 
  question, 
  answer, 
  optionA, 
  optionB, 
  optionC, 
  optionD, 
  optionE, 
  modal, 
  toggle,
  create_loading,
  handleFileChange,
  handleNewQuestion
}) => {
  const [isAnswerFile, setIsAnswerFile ] = useState(false);
  const [ isAFile, setIsAFile ] = useState(false);
  const [ isBFile, setIsBFile ] = useState(false);
  const [ isCFile, setIsCFile ] = useState(false);
  const [ isDFile, setIsDFile ] = useState(false);
  const [ isEFile, setIsEFile ] = useState(false);
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} id="new-question-modal">
        <ModalHeader toggle={toggle} id="modal-header">New Question</ModalHeader>
        <ModalBody>
          <div className="input-container">
            <label htmlFor="question">Question</label>
            <Input id="question" onChange={(e) => handleChange(e)} name="question" value={question} type="textarea" placeholder="Type your question here..." />
          </div>
          <div className="input-container">
            <label htmlFor="answer">Answer</label>
            {isAnswerFile ? (
              <div className="input-option">
                <Input accept="image/*" onChange={(e) => handleFileChange(e)} type="file" name="answerFile" value={answer} id="answer" />
                <div className="option">
                  <BsChevronDown className="option-icon" />
                  <div className="option-display">
                    <p onClick={() => setIsAnswerFile(false)}>Text</p>
                    <p onClick={() => setIsAnswerFile(true)}>File</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="input-option">
                <Input onChange={(e) => handleChange(e)} name="answer" value={answer} id="answer" placeholder="Enter Question Answer here..." />
                <div className="option">
                  <BsChevronDown className="option-icon" />
                  <div className="option-display">
                    <p onClick={() => setIsAnswerFile(false)}>Text</p>
                    <p onClick={() => setIsAnswerFile(true)}>File</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="input-container">
            <label htmlFor="optionA">Option A</label>
            {isAFile ? (
              <div className="input-option">
                <Input accept="image/*" onChange={(e) => handleFileChange(e)} type="file" name="optionAFile" value={optionA} id="optionA" placeholder="Enter option A here..." />
                <div className="option">
                  <BsChevronDown className="option-icon" />
                  <span className="option-display">
                    <p onClick={() => setIsAFile(false)}>Text</p>
                    <p onClick={() => setIsAFile(true)}>File</p>
                  </span>
                </div>
              </div>
            ) : (
              <div className="input-option">
                <Input onChange={(e) => handleChange(e)} name="optionA" value={optionA} id="optionA" placeholder="Enter option A here..." />
                <div className="option">
                  <BsChevronDown className="option-icon" />
                  <div className="option-display">
                    <p onClick={() => setIsAFile(false)}>Text</p>
                    <p onClick={() => setIsAFile(true)}>File</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="input-container">
            <label htmlFor="optionB">Option B</label>
            {isBFile ? (
              <div className="input-option">
                <Input accept="image/*" onChange={(e) => handleFileChange(e)} type="file" name="optionBFile" value={optionB} id="optionB" placeholder="Enter option B here..." />
                <div className="option">
                  <BsChevronDown className="option-icon" />
                  <span className="option-display">
                    <p onClick={() => setIsBFile(false)}>Text</p>
                    <p onClick={() => setIsBFile(true)}>File</p>
                  </span>
                </div>
              </div>
            ) : (
              <div className="input-option">
                <Input onChange={(e) => handleChange(e)} name="optionB" value={optionB} id="optionB" placeholder="Enter option B here..." />
                <div className="option">
                  <BsChevronDown className="option-icon" />
                  <div className="option-display">
                    <p onClick={() => setIsBFile(false)}>Text</p>
                    <p onClick={() => setIsBFile(true)}>File</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="input-container">
            <label htmlFor="optionA">Option C</label>
            {isCFile ? (
              <div className="input-option">
                <Input accept="image/*" onChange={(e) => handleFileChange(e)} type="file" name="optionCFile" value={optionC} id="optionC" placeholder="Enter option C here..." />
                <div className="option">
                  <BsChevronDown className="option-icon" />
                  <span className="option-display">
                    <p onClick={() => setIsCFile(false)}>Text</p>
                    <p onClick={() => setIsCFile(true)}>File</p>
                  </span>
                </div>
              </div>
            ) : (
              <div className="input-option">
                <Input onChange={(e) => handleChange(e)} name="optionC" value={optionC} id="optionC" placeholder="Enter option C here..." />
                <div className="option">
                  <BsChevronDown className="option-icon" />
                  <div className="option-display">
                    <p onClick={() => setIsCFile(false)}>Text</p>
                    <p onClick={() => setIsCFile(true)}>File</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="input-container">
            <label htmlFor="optionA">Option D</label>
            {isDFile ? (
              <div className="input-option">
                <Input accept="image/*" onChange={(e) => handleFileChange(e)} type="file" name="optionDFile" value={optionD} id="optionD" placeholder="Enter option D here..." />
                <div className="option">
                  <BsChevronDown className="option-icon" />
                  <span className="option-display">
                    <p onClick={() => setIsDFile(false)}>Text</p>
                    <p onClick={() => setIsDFile(true)}>File</p>
                  </span>
                </div>
              </div>
            ) : (
              <div className="input-option">
                <Input onChange={(e) => handleChange(e)} name="optionD" value={optionD} id="optionD" placeholder="Enter option D here..." />
                <div className="option">
                  <BsChevronDown className="option-icon" />
                  <div className="option-display">
                    <p onClick={() => setIsDFile(false)}>Text</p>
                    <p onClick={() => setIsDFile(true)}>File</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="input-container">
            <label htmlFor="optionE">Option E</label>
            {isEFile ? (
              <div className="input-option">
                <Input onChange={(e) => handleFileChange(e)} accept="image/*" type="file" name="optionEFile" value={optionA} id="optionE" placeholder="Enter option E here..." />
                <div className="option">
                  <BsChevronDown className="option-icon" />
                  <span className="option-display">
                    <p onClick={() => setIsEFile(false)}>Text</p>
                    <p onClick={() => setIsEFile(true)}>File</p>
                  </span>
                </div>
              </div>
            ) : (
              <div className="input-option">
                <Input onChange={(e) => handleChange(e)} name="optionE" value={optionE} id="optionE" placeholder="Enter option E here..." />
                <div className="option">
                  <BsChevronDown className="option-icon" />
                  <div className="option-display">
                    <p onClick={() => setIsEFile(false)}>Text</p>
                    <p onClick={() => setIsEFile(true)}>File</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          {create_loading ? <Button className="submit-button" loading>Processing...</Button> : 
          <Button className="submit-button" color="primary" onClick={handleNewQuestion}>Submit</Button>}
          {" "}<Button className="cancel-button" color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default NewQuestion;