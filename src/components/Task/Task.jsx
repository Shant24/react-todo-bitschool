import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './task.module.scss';
import { removeTask } from '../../store/actions/taskActions';
import { formatDate, shortStr } from '../../helpers/utils';

const Task = (props) => {
  const { task, disabled, onEdit, removeTask, checked, onCheck } = props;

  return (
    <Card className={cx(styles.card, { [styles.checked]: checked })}>
      <input
        type="checkbox"
        className={styles.checkbox}
        onChange={onCheck}
        checked={checked}
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
          {task.description.length > 25
            ? shortStr(task.description, 25)
            : task.description}
        </Card.Text>

        <Card.Text>
          <b>Date:</b> {formatDate(task.date, 10)}
        </Card.Text>

        <Card.Text>
          <b>Created:</b> {formatDate(task.created_at, 10)}
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
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

const mapDispatchToProps = {
  removeTask,
};

export default connect(null, mapDispatchToProps)(Task);
