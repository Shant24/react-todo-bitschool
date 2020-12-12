import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import styles from './singleTask.module.scss';
import EditTaskModal from '../../EditTaskModal/EditTaskModal';
import { getSingleTask, removeTask } from '../../../store/actions/taskActions';
import { formatDate } from '../../../helpers/utils';

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
    const { task, removeTask } = this.props;

    return (
      <>
        {task ? (
          <div className={styles.singleTaskContainer}>
            <div className={styles.dateAndButtons}>
              <div className={styles.dateContainer}>
                <b>Date: </b>
                <div>{formatDate(task.date, 10)}</div>
              </div>

              <div className={styles.dateContainer}>
                <b>Created: </b>
                <div>{formatDate(task.created_at, 10)}</div>
              </div>

              <div>
                <Button
                  className={styles.taskButtons}
                  variant="info"
                  onClick={this.toggleEditModal}
                >
                  <FontAwesomeIcon icon={faEdit} />
                  <span>Edit</span>
                </Button>
                <Button
                  className={styles.taskButtons}
                  variant="danger"
                  onClick={removeTask(task._id, 'single')}
                >
                  <FontAwesomeIcon icon={faTrash} />
                  <span>Delete</span>
                </Button>
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
        ) : (
          <div className={styles.noTask}>This task not found!</div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  task: state.task.task,
  editTaskSuccess: state.task.editTaskSuccess,
  removeTaskSuccess: state.task.removeTaskSuccess,
});

const mapDispatchToProps = { getSingleTask, removeTask };

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);
