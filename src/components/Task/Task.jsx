import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './task.module.scss';
import { removeTask } from '../../store/actions/taskActions';

class Task extends PureComponent {
  state = {
    checked: false,
  };

  toggleCheckbox = () => {
    this.setState({ checked: !this.state.checked });

    this.props.onCheck();
  };

  render() {
    const { task, disabled, onEdit, removeTask } = this.props;
    const { checked } = this.state;

    return (
      <Card className={cx(styles.card, { [styles.checked]: checked })}>
        <input
          type="checkbox"
          className={styles.checkbox}
          onClick={this.toggleCheckbox}
        />

        <Card.Body>
          {disabled ? (
            <Card.Title>
              <h3>{task.title}</h3>
            </Card.Title>
          ) : (
            <Link to={`/task/${task._id}`} className={styles.titleLink}>
              <Card.Title>
                <h3>{task.title}</h3>
              </Card.Title>
            </Link>
          )}

          <Card.Text>
            <b>Description:</b>{' '}
            {task.description.length > 100
              ? task.description.slice(0, 100) + '...'
              : task.description}
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
              onClick={removeTask(task._id, task)}
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
  disabled: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  removeTask,
};

export default connect(null, mapDispatchToProps)(Task);
