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
    const { task, onRemove, onEdit, disabled } = this.props;
    const { checked } = this.state;

    return (
      <Card className={cx(styles.card, { [styles.checked]: checked })}>
        <input
          type="checkbox"
          className={styles.checkbox}
          onClick={this.toggleCheckbox}
        />

        <Card.Body>
          <Card.Title>
            <h3>{task.title}</h3>
          </Card.Title>

          <Card.Text>
            <b>Description:</b> {task.description}
          </Card.Text>

          <Card.Text>
            <b>Date:</b> {task.date ? task.date.slice(0, 10) : 'none'}
          </Card.Text>

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
              onClick={onRemove(task._id)}
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
  onRemove: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Task;
