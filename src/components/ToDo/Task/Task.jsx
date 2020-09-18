import React, { PureComponent } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import classes from './task.module.scss';

class componentName extends PureComponent {
  state = {
    propsText: this.props.task.text,
    taskTextValue: this.props.task.text,
    isEditMode: false,
    checked: false,
  };

  handelToggleEditMode = () => {
    const { isEditMode, taskTextValue, propsText } = this.state;
    const { editTask, task } = this.props;

    isEditMode && propsText !== taskTextValue && editTask(task.id, taskTextValue);

    this.setState({
      isEditMode: !isEditMode,
    });
  };

  handleChangeText = (e) => {
    this.setState({
      taskTextValue: e.target.value,
    });
  };

  toggleCheckbox = () => {
    this.setState({
      checked: !this.state.checked,
    });

    this.props.onCheck();
  };

  handleOnCheck = (taskId) => () => {
    console.log(taskId);
  };

  render() {
    const { task, removeTask } = this.props;
    const { isEditMode, taskTextValue, checked } = this.state;

    return (
      <Card className={`${classes.card} ${checked ? classes.checked : ''}`}>
        <input type="checkbox" className={classes.checkbox} onClick={this.toggleCheckbox} />
        <Card.Body>
          <Card.Title>Task</Card.Title>
          <Card.Text>
            {isEditMode ? (
              <Form.Control
                className={classes.textarea}
                onChange={this.handleChangeText}
                as="textarea"
                rows="5"
                value={taskTextValue}
              />
            ) : (
              taskTextValue
            )}
          </Card.Text>
          <div className={classes.buttonContainer}>
            <Button
              className={classes.taskButtons}
              variant={isEditMode ? 'primary' : 'success'}
              onClick={this.handelToggleEditMode}
            >
              <FontAwesomeIcon icon={isEditMode ? faCheck : faPen} />
              <span>{isEditMode ? 'Save' : 'Edit'}</span>
            </Button>

            <Button className={classes.taskButtons} variant="danger" onClick={removeTask(task.id)}>
              <FontAwesomeIcon icon={faTrash} />
              <span>Delete</span>
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default componentName;
