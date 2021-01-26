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
import Search from '../../Search/Search';

class ToDo extends PureComponent {
  state = {
    editTask: null,
    openNewTaskModal: false,
    checkedTasks: new Set(),
    showConfirm: false,
  };

  componentDidMount() {
    this.props.isAuthenticated && this.props.getTasks();
  }

  componentDidUpdate(prevProps) {
    const { addTaskSuccess, editTaskSuccess, removeTasksSuccess } = this.props;

    if (!prevProps.addTaskSuccess && addTaskSuccess) {
      this.setState({ openNewTaskModal: false });
    }

    if (!prevProps.editTaskSuccess && editTaskSuccess) {
      this.setState({ editTask: null });
    }

    if (!prevProps.removeTasksSuccess && removeTasksSuccess) {
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
    const { tasks, removeSelectedTasks } = this.props;
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
        <Container fluid className="pt-3">
          <Row className="mb-4 flex-column">
            <Col className="mb-3">
              <Search />
            </Col>

            <Col className="d-flex justify-content-center mb-4 mb-md-0">
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

          {tasksComponents.length > 0 ? (
            <Row className={styles.taskContainer}>{tasksComponents}</Row>
          ) : (
            <div className={styles.noTask}>
              <h2>
                <span>You haven't Task.</span>{' '}
                <span>Create your first Task</span>
                <span>
                  <span
                    role="img"
                    aria-label="a yellow face with a slight smile shown winking"
                  >
                    😉
                  </span>
                  <span role="img" aria-label="a single finger pointing upward">
                    ☝️
                  </span>
                </span>
              </h2>
            </div>
          )}

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
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  getTasks,
  removeSelectedTasks,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
