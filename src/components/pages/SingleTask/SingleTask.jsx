import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faEdit,
  faCheck,
  faHistory,
} from '@fortawesome/free-solid-svg-icons';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from './singleTask.module.scss';
import EditTaskModal from '../../EditTaskModal/EditTaskModal';
import {
  changeTaskStatus,
  getSingleTask,
  removeTask,
} from '../../../store/actions/taskActions';
import { formatDate } from '../../../helpers/utils';
import { Redirect } from 'react-router';

class SingleTask extends Component {
  state = {
    isEdit: false,
  };

  componentDidMount() {
    this.props.getSingleTask(this.props.match.params.taskId);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.removeTaskSuccess && this.props.removeTaskSuccess) {
      this.props.history.push('/');
    }

    if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
      this.setState({
        isEdit: false,
      });
    }
  }

  toggleEditModal = () => {
    this.setState({ isEdit: !this.state.isEdit });
  };

  render() {
    const { isEdit } = this.state;
    const { task, removeTask, isAuth, changeTaskStatus } = this.props;
    console.log('🚀 ~ SingleTask ~ render ~ task', task?.status);

    return (
      <>
        {!isAuth && <Redirect to="/login" />}

        {task ? (
          <div className={styles.singleTaskContainer}>
            <div className={styles.singleTaskWrapper}>
              <div className={styles.taskInformationAndButtons}>
                <div className={styles.datesAndStatsContainer}>
                  <div className={styles.informationContainer}>
                    <b>Created</b>
                    <div className={styles.date}>
                      {formatDate(task.created_at, 10)}
                    </div>
                  </div>

                  <div className={styles.informationContainer}>
                    <b>Deadline</b>
                    <div className={styles.date}>
                      {formatDate(task.date, 10)}
                    </div>
                  </div>

                  <div className={styles.informationContainer}>
                    <b>Status</b>
                    <div
                      className={`${styles.status} ${
                        task.status === 'active' && styles.active
                      }`}
                    >
                      {task?.status?.charAt(0).toUpperCase() +
                        task?.status?.slice(1)}
                    </div>
                  </div>
                </div>

                <div className={styles.buttonContainer}>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip>
                        <strong>
                          {task.status === 'active'
                            ? 'Mark as done'
                            : 'Mark as active'}
                        </strong>
                      </Tooltip>
                    }
                  >
                    <Button
                      onClick={() =>
                        changeTaskStatus(
                          task._id,
                          task.status === 'active' ? 'done' : 'active',
                          'single'
                        )
                      }
                      className={styles.taskButtons}
                      variant={task.status === 'active' ? 'success' : 'warning'}
                    >
                      <FontAwesomeIcon
                        icon={task.status === 'active' ? faCheck : faHistory}
                      />
                    </Button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip>
                        <strong>Edit</strong>
                      </Tooltip>
                    }
                  >
                    <Button
                      onClick={this.toggleEditModal}
                      className={styles.taskButtons}
                      variant="info"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip>
                        <strong>Remove</strong>
                      </Tooltip>
                    }
                  >
                    <Button
                      onClick={removeTask(task._id, 'single')}
                      className={styles.taskButtons}
                      variant="danger"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>

              <div className={styles.titleContainer}>
                <b>Title:</b>
                <div className={styles.title}>{task.title}</div>
              </div>

              <div className={styles.descriptionContainer}>
                <b>Description:</b>
                <div className={styles.description}>{task.description}</div>
              </div>

              {isEdit && (
                <EditTaskModal
                  data={task}
                  onCancel={this.toggleEditModal}
                  from="single"
                />
              )}
            </div>
          </div>
        ) : (
          <div className={styles.noTask}>This task is not found!</div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  task: state.task.task,
  editTaskSuccess: state.task.editTaskSuccess,
  removeTaskSuccess: state.task.removeTaskSuccess,
  isAuth: state.auth.isAuth,
});

const mapDispatchToProps = { getSingleTask, removeTask, changeTaskStatus };

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);
