import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, FormControl, Modal } from 'react-bootstrap';
import { isMobile } from 'react-device-detect';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../NewTask/newTask.module.scss';
import { editTask } from '../../store/actions/taskActions';

class EditTaskModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...props.data,
      date: new Date(props.data.date),
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
    let { title, description, date, _id } = this.state;
    const { editTask, from } = this.props;

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

    title && editTask(_id, data, from);
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
            Edit Task
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

          <Form.Group className={styles.datePicker + ' d-flex flex-column'}>
            <Form.Label htmlFor="newTaskDate">
              <div className={styles.date}>Deadline date</div>
            </Form.Label>
            <DatePicker
              id="newTaskDate"
              selected={date}
              minDate={new Date()}
              onChange={(date) => this.handleChange('date', date)}
              dateFormat="dd.MM.yyyy"
              autoComplete="off"
              todayButton="Today"
              showYearDropdown
              showMonthDropdown
              withPortal={isMobile}
              popperPlacement="top"
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.handleSave} variant="success">
            Save
          </Button>

          <Button onClick={this.props.onCancel} variant="secondary">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

EditTaskModal.propTypes = {
  data: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  from: PropTypes.oneOf(['single', 'task', '']),
};

const mapDispatchToProps = {
  editTask,
};

export default connect(null, mapDispatchToProps)(EditTaskModal);
