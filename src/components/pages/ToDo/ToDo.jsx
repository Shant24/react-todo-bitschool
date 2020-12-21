import React, { PureComponent } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import styles from './todo.module.scss';
import Confirm from '../../Confirm/Confirm';
import NewTask from '../../NewTask/NewTask';
import Task from '../../Task/Task';
import EditTaskModal from '../../EditTaskModal/EditTaskModal';
import {
  getTasks,
  removeSelectedTasks,
} from '../../../store/actions/taskActions';
import { Redirect } from 'react-router';

class ToDo extends PureComponent {
  state = {
    editTask: null,
    openNewTaskModal: false,
    checkedTasks: new Set(),
    showConfirm: false,
  };

  componentDidMount() {
    this.props.getTasks();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.addTaskSuccess && this.props.addTaskSuccess) {
      this.setState({ openNewTaskModal: false });
    }

    if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
      this.setState({ editTask: null });
    }

    if (!prevProps.removeTasksSuccess && this.props.removeTasksSuccess) {
      this.setState({
        checkedTasks: new Set(),
        showConfirm: false,
      });
    }
  }

  handleEdit = (task) => () => {
    this.setState({ editTask: task });
  };

  toggleNewTaskModal = () => {
    this.setState({ openNewTaskModal: !this.state.openNewTaskModal });
  };

  handleCheckTaskForDelete = (taskId) => () => {
    const checkedTasks = new Set(this.state.checkedTasks);

    checkedTasks.has(taskId)
      ? checkedTasks.delete(taskId)
      : checkedTasks.add(taskId);

    this.setState({ checkedTasks });
  };

  toggleConfirmForRemove = () => {
    this.setState({ showConfirm: !this.state.showConfirm });
  };

  handleUnselect = () => {
    this.setState({ checkedTasks: new Set() });
  };

  render() {
    const { tasks, removeSelectedTasks, isAuth } = this.props;
    const {
      editTask,
      openNewTaskModal,
      checkedTasks,
      showConfirm,
    } = this.state;

    const tasksComponents = tasks.map((task) => {
      return (
        <Col key={task._id} xl={3} lg={4} md={6} className={styles.task}>
          <Task
            task={task}
            onCheck={this.handleCheckTaskForDelete(task._id)}
            onEdit={this.handleEdit(task)}
            disabled={!!checkedTasks.size}
            checked={checkedTasks.has(task._id)}
          />
        </Col>
      );
    });

    return (
      <>
        {!isAuth && <Redirect to="/sign-in" />}

        <Container fluid className="pt-3">
          <Row className="mb-4 align-items-center">
            <Col className="d-flex justify-content-center">
              {checkedTasks.size ? (
                <div className={styles.buttonsContainerThenTaskSelected}>
                  <Button
                    className={styles.buttonsThenTaskSelected}
                    onClick={this.handleUnselect}
                    variant="warning"
                  >
                    Unselect all
                  </Button>

                  <Button
                    className={styles.buttonsThenTaskSelected}
                    onClick={this.toggleConfirmForRemove}
                    variant="danger"
                  >
                    Remove selected {checkedTasks.size} tasks
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={this.toggleNewTaskModal}
                  className={styles.addButton}
                  variant="light"
                >
                  Add new Task
                </Button>
              )}
            </Col>
          </Row>

          <Row className={styles.taskContainer}>{tasksComponents}</Row>

          {showConfirm && (
            <Confirm
              count={checkedTasks.size}
              onSubmit={removeSelectedTasks(checkedTasks)}
              onCancel={this.toggleConfirmForRemove}
            />
          )}

          {!!editTask && (
            <EditTaskModal data={editTask} onCancel={this.handleEdit(null)} />
          )}

          {openNewTaskModal && <NewTask onCancel={this.toggleNewTaskModal} />}
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  tasks: state.task.tasks,
  addTaskSuccess: state.task.addTaskSuccess,
  editTaskSuccess: state.task.editTaskSuccess,
  removeTasksSuccess: state.task.removeTasksSuccess,
  isAuth: state.auth.isAuth,
});

const mapDispatchToProps = {
  getTasks,
  removeSelectedTasks,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
