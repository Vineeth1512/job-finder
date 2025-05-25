import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { updateDoc, doc,arrayUnion } from "firebase/firestore";
import { db } from "../../../../Config/firebaseConfig";

export const PostJob = () => {
  const [openModal, setOpenMoal] = useState(false);
  const handleClick = () => {
    setOpenMoal(true);
  };
  const handleClose = () => {
    setOpenMoal(false);
  };
  const [jobDetails, setJobDetails] = useState({
    jobRole: "",
    company: "",
    jd: "",
  });

  const loggedInRecruiter = JSON.parse(
    localStorage.getItem("loggedInRecruiter")
  );
  console.log(loggedInRecruiter);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    //const {jobRole , company , jd} = jobDetails
   const recruiterDocRef =  doc(db, "recruiters", loggedInRecruiter.user.displayName)
    await updateDoc(recruiterDocRef,{
      jobs:arrayUnion(jobDetails)
    });

   console.log(recruiterDocRef);
   
    
    handleClose();
    console.log(jobDetails);
    alert("Job Posted Successfully");
  };

  return (
    <div>
      <Button onClick={handleClick}>Add Job Post</Button>

      <Modal show={openModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Job Role</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) =>
                  setJobDetails({ ...jobDetails, jobRole: e.target.value })
                }
              >
                <option>Select Job Role</option>
                <option value="frontend">Frontend Develover</option>
                <option value="backend">Backend Develover</option>
                <option value="fullstack">FullStack Develover</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Company here"
                onChange={(e) =>
                  setJobDetails({ ...jobDetails, company: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Job Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) =>
                  setJobDetails({ ...jobDetails, jd: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleFormSubmit}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
