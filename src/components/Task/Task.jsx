import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faEdit,
  faCheck,
  faHistory,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './task.module.scss';
import { removeTask, changeTaskStatus } from '../../store/actions/taskActions';
import { formatDate, shortStr } from '../../helpers/utils';

const Task = (props) => {
  const {
    task,
    disabled,
    onEdit,
    removeTask,
    changeTaskStatus,
    checked,
    onCheck,
  } = props;
  const { _id, status, title, description, date, created_at } = task;

  return (
    <Card
      className={`${styles.card} ${checked && styles.checked} ${
        status === 'done' && styles.done
      }`}
    >
      <Card.Body className={styles.cardBody}>
        <div className={styles.titleAndCheckbox}>
          <Card.Title>
            {disabled ? (
              <h3>{title}</h3>
            ) : (
              <Link to={`/task/${_id}`} className={styles.titleLink}>
                <h3>{title}</h3>
              </Link>
            )}
          </Card.Title>

          <div className={styles.selectContainer}>
            <label htmlFor={_id}>Select</label>
            <input
              id={_id}
              className={styles.checkbox}
              type="checkbox"
              onChange={onCheck}
              checked={checked}
            />
          </div>
        </div>

        <Card.Text>
          <b>Description:</b> {shortStr(description, 25)}
        </Card.Text>

        <Card.Text>
          <b className={styles.created}>Created:</b>
          {formatDate(created_at, 10)}
        </Card.Text>

        <Card.Text>
          <b className={styles.deadline}>Deadline:</b> {formatDate(date, 10)}
        </Card.Text>

        <Card.Text>
          <b className={styles.status}>Status:</b>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Card.Text>

        <div className={styles.buttonContainer}>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                <strong>
                  {status === 'active' ? 'Mark as done' : 'Mark as active'}
                </strong>
              </Tooltip>
            }
          >
            <Button
              onClick={() =>
                changeTaskStatus(_id, status === 'active' ? 'done' : 'active')
              }
              className={`${styles.taskButtons} m-1`}
              variant={status === 'active' ? 'success' : 'warning'}
              disabled={disabled}
            >
              <FontAwesomeIcon
                icon={status === 'active' ? faCheck : faHistory}
              />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                <strong>Edit</strong>
              </Tooltip>
            }
          >
            <Button
              onClick={onEdit}
              className={`${styles.taskButtons} m-1`}
              variant="info"
              disabled={disabled}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                <strong>Remove</strong>
              </Tooltip>
            }
          >
            <Button
              onClick={removeTask(_id)}
              className={`${styles.taskButtons} m-1`}
              variant="danger"
              disabled={disabled}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </OverlayTrigger>
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
  changeTaskStatus,
};

export default connect(null, mapDispatchToProps)(memo(Task));
