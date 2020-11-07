import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormControl, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../NewTask/newTask.module.scss';

class NewTask extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...props.data,
      date: new Date(props.data.date),
      valid: true,
      validationType: null,
    };
  }

  validationErrors = {
    requiredError: 'The field is required!',
    lengthError: 'The Title length should be less then 50 characters',
  };

  handleChange = (type, value) => {
    if (type === 'title') {
      if (!this.state.valid) {
        this.setState({ valid: true });
      }

      if (value.length > 50) {
        this.setState({ valid: false, validationType: 'lengthError' });

        return;
      }
    }

    this.setState({ [type]: value });
  };

  handleSave = () => {
    let { title, description, date, _id } = this.state;

    title = title.trim();

    if (!title) {
      this.setState({ valid: false, validationType: 'requiredError' });

      return;
    }

    const data = {
      title,
      description,
      date: date.toISOString().slice(0, 10),
    };

    if (title) {
      this.props.onSave(_id, data);
    }
  };

  render() {
    const { title, description, date, valid, validationType } = this.state;

    let errorMessage = '';

    !valid && (errorMessage = this.validationErrors[validationType]);

    return (
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        show={true}
        onHide={this.props.onCancel}
        centered
        className={styles.modal}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Task
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label className={errorMessage && 'text-danger'}>
              {errorMessage ? errorMessage : <b>Title</b>}
            </Form.Label>
            <FormControl
              className={!valid && styles.invalid}
              placeholder="Title"
              aria-label="Title"
              aria-describedby="basic-addon2"
              value={title}
              onChange={(event) =>
                this.handleChange('title', event.target.value)
              }
            />
          </Form.Group>

          <Form.Group className="my-3">
            <Form.Label>
              <b>Description</b>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Description"
              className={styles.textarea}
              value={description}
              onChange={(event) =>
                this.handleChange('description', event.target.value)
              }
            />
          </Form.Group>

          <Form.Group className={styles.datePicker + ' d-flex flex-column'}>
            <Form.Label>
              <b>Date</b>
            </Form.Label>
            <DatePicker
              selected={date}
              minDate={new Date()}
              onChange={(date) => this.handleChange('date', date)}
              dateFormat="dd.MM.yyyy"
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.handleSave} variant="success">
            Save
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
  data: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default NewTask;
