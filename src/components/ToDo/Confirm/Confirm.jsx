import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

const Confirm = (props) => {
  const { count, onSubmit, onCancel } = props;

  return (
    <Modal
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

Confirm.propTypes = {
  count: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Confirm;
