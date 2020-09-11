import React, { Component } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import classes from './todo.module.scss';

class componentName extends Component {
  state = {
    taskTextValue: this.props.task.text,
    isEditMode: false,
  };

  handelToggleEditMode = () => {
    const { isEditMode, taskTextValue } = this.state;
    const { editTask, task } = this.props;

    isEditMode && editTask(task.id, taskTextValue);

    this.setState({
      isEditMode: !isEditMode,
    });
  };

  handleChangeText = (e) => {
    this.setState({
      taskTextValue: e.target.value,
    });
  };

  render() {
    const { task, removeTask } = this.props;
    const { isEditMode, taskTextValue } = this.state;

    return (
      <Card className={classes.card}>
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

            <Button
              className={classes.taskButtons}
              variant="danger"
              onClick={removeTask(task.id)}
            >
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
