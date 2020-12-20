import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, FormControl, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './newTask.module.scss';
import { addTask } from '../../store/actions/taskActions';

class NewTask extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      date: new Date(),
      valid: true,
      validationType: null,
    };

    this.titleRef = createRef();
  }

  componentDidMount() {
    this.titleRef.current.focus();
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
    let { title, description, date } = this.state;
    const { addTask } = this.props;

    title = title.trim();

    if (!title) {
      this.setState({ valid: false, validationType: 'requiredError' });

      return;
    }

    date = date || new Date();

    const data = {
      title,
      description: description.trim(),
      date: date.toISOString().slice(0, 10),
    };

    title && addTask(data);
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSave();
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
            Add new task
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label
              htmlFor="newTaskTitle"
              className="d-flex justify-content-between"
            >
              <b>Title</b>
              {errorMessage && (
                <span className={'text-danger'}>{errorMessage}</span>
              )}
            </Form.Label>
            <FormControl
              id="newTaskTitle"
              ref={this.titleRef}
              className={!valid && styles.invalid}
              placeholder="Title"
              aria-label="Title"
              aria-describedby="basic-addon2"
              value={title}
              onChange={(e) => this.handleChange('title', e.target.value)}
              onKeyDown={this.handleKeyDown}
            />
          </Form.Group>

          <Form.Group className="my-3">
            <Form.Label htmlFor="newTaskDescription">
              <b>Description</b>
            </Form.Label>
            <Form.Control
              id="newTaskDescription"
              className={styles.textarea}
              as="textarea"
              rows={4}
              placeholder="Description"
              value={description}
              onChange={(event) =>
                this.handleChange('description', event.target.value)
              }
            />
          </Form.Group>

          <Form.Group className={styles.datePicker}>
            <Form.Label htmlFor="newTaskDate">
              <div className={styles.date}>Date</div>
            </Form.Label>
            <DatePicker
              id="newTaskDate"
              selected={date}
              minDate={new Date()}
              onChange={(date) => this.handleChange('date', date)}
              dateFormat="dd.MM.yyyy"
            />
          </Form.Group>
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
  onCancel: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  addTask,
};

export default connect(null, mapDispatchToProps)(NewTask);
