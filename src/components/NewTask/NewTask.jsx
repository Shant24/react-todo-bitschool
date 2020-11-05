import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, Modal } from 'react-bootstrap';

class NewTask extends PureComponent {
  state = {
    title: '',
    description: '',
    date: '',
  };

  handleChange = (e) => this.setState({ title: e.target.value });

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSave();
    }
  };

  handleSave = () => {
    const { title } = this.state;
    if (title) {
      this.props.onAdd(title);
    }
  };

  render() {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        show={true}
        onHide={this.props.onCancel}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add new task
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormControl
            placeholder="Task title"
            aria-label="Task title"
            aria-describedby="basic-addon2"
            value={this.state.title}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.handleSave} variant="success">
            Add
          </Button>

          <Button onClick={this.props.onCancel} variant="secondary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

NewTask.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default NewTask;
