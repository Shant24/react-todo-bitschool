import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import styles from './singleTask.module.scss';
import Spinner from '../../Spinner/Spinner';
import EditTaskModal from '../../EditTaskModal/EditTaskModal';

class SingleTask extends Component {
  state = {
    task: null,
    isEdit: false,
  };

  componentDidMount() {
    this.getSingleTask();
  }

  getSingleTask = () => {
    fetch(`http://localhost:3001/task/${this.props.match.params.taskId}`)
      .then((res) => res.json())
      .then((task) => {
        if (task.error) throw task.error;

        this.setState({ task });
      })
      .catch((err) => console.log(err));
  };

  handelRemove = () => {
    fetch(`http://localhost:3001/task/${this.state.task._id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;

        this.props.history.push('/');
      })
      .catch((err) => console.log(err));
  };

  toggleEditModal = () => {
    this.setState({ isEdit: !this.state.isEdit });
  };

  handleSave = (taskId, data) => {
    fetch(`http://localhost:3001/task/${taskId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((editedTask) => {
        if (editedTask.error) {
          throw editedTask.error;
        }

        this.setState({ task: editedTask, isEdit: false });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { task, isEdit } = this.state;

    return (
      <>
        {task ? (
          <div className={styles.singleTaskContainer}>
            <div className={styles.dateAndButtons}>
              <div className={styles.dateContainer}>
                <b>Date: </b>
                <div>{task.date.slice(0, 10)}</div>
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
                  onClick={this.handelRemove}
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
                onSave={this.handleSave}
                onCancel={this.toggleEditModal}
              />
            )}
          </div>
        ) : (
          <Spinner />
        )}
      </>
    );
  }
}

export default SingleTask;
