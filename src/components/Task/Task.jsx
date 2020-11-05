import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';
import styles from './task.module.scss';

class Task extends PureComponent {
  state = {
    checked: false,
  };

  toggleCheckbox = () => {
    this.setState({ checked: !this.state.checked });

    this.props.onCheck();
  };

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  render() {
    const { task, removeTask, onEdit, disabled } = this.props;
    const { checked } = this.state;

    return (
      <Card className={cx(styles.card, { [styles.checked]: checked })}>
        <input type="checkbox" className={styles.checkbox} onClick={this.toggleCheckbox} />

        <Card.Body>
          <Card.Title>{task.title}</Card.Title>

          <Card.Text>{task.description}</Card.Text>

          <div className={styles.buttonContainer}>
            <Button
              onClick={onEdit}
              className={styles.taskButtons}
              variant="info"
              disabled={disabled}
            >
              <FontAwesomeIcon icon={faEdit} />
              <span>Edit</span>
            </Button>

            <Button
              onClick={removeTask(task._id)}
              className={styles.taskButtons}
              variant="danger"
              disabled={disabled}
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

Task.propTypes = {
  task: PropTypes.object.isRequired,
  removeTask: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Task;
