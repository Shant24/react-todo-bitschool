import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const Confirm = (props) => {
  const { count, onSubmit, onCancel } = props;

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      show={true}
      onHide={onCancel}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Are you sure to remove {count} tasks?
        </Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <Button onClick={onSubmit} variant="danger">
          Remove
        </Button>
        <Button onClick={onCancel} variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Confirm;
