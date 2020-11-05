import React, { Component } from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

class taskModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: props.value.text,
    };
  }

  handleInputChange = (e) => this.setState({ inputValue: e.target.value });

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSave();
    }
  };

  handleSave = () => {
    const { inputValue } = this.state;

    if (inputValue) {
      const taskId = this.props.value.id;

      this.props.onSave(taskId, inputValue);
    }
  };

  render() {
    const { onCancel } = this.props;

    return (
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        show={true}
        onHide={onCancel}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Edit task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormControl
            placeholder="Input task"
            aria-label="Input task"
            aria-describedby="basic-addon2"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.handleSave} variant="success">
            Save
          </Button>

          <Button onClick={onCancel} variant="secondary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

taskModal.propTypes = {
  value: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default taskModal;
