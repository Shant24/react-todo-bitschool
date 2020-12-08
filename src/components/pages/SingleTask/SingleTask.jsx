import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import styles from './singleTask.module.scss';
import EditTaskModal from '../../EditTaskModal/EditTaskModal';
import { getSingleTask, removeTask } from '../../../store/actions/taskActions';

class SingleTask extends Component {
  state = {
    isEdit: false,
  };

  componentDidMount() {
    this.props.getSingleTask(this.props.match.params.taskId);
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.removeSingleTaskSuccessMessage &&
      this.props.removeSingleTaskSuccessMessage
    ) {
      this.props.history.push('/');
    }

    if (!prevProps.editSingleTaskSuccess && this.props.editSingleTaskSuccess) {
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
        {task && (
          <div className={styles.singleTaskContainer}>
            <div className={styles.dateAndButtons}>
              <div className={styles.dateContainer}>
                <b>Date: </b>
                <div>{task.date?.slice(0, 10)}</div>
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
                  onClick={removeTask(task._id)}
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
                fromSingleTask={true}
              />
            )}
          </div>
        )}
      </>
    );
  }
}

SingleTask.propTypes = {
  task: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]),
  editSingleTaskSuccess: PropTypes.bool.isRequired,
  removeSingleTaskSuccessMessage: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]),
  getSingleTask: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  task: state.task.task,
  editSingleTaskSuccess: state.task.editSingleTaskSuccess,
  removeSingleTaskSuccessMessage: state.task.removeSingleTaskSuccessMessage,
});

const mapDispatchToProps = { getSingleTask, removeTask };

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);
