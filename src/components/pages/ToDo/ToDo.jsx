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
    const { tasks, removeSelectedTasks } = this.props;
    const {
      editTask,
      openNewTaskModal,
      checkedTasks,
      showConfirm,
    } = this.state;

    const tasksComponents = tasks.map((task) => {
      return (
        <Col key={task._id} xl={3} lg={4} md={6}>
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
      <Container fluid className="pt-4">
        <Row className="mb-4 align-items-center">
          <Col
            sm={2}
            xs={12}
            className="d-flex justify-content-sm-start justify-content-center"
          >
            <h1 className={styles.h1}>ToDo App</h1>
          </Col>

          <Col
            sm={10}
            xs={12}
            className="d-flex justify-content-sm-end justify-content-center"
          >
            {checkedTasks.size ? (
              <div>
                <Button
                  className="mr-2"
                  onClick={this.handleUnselect}
                  variant="primary"
                >
                  Unselect all
                </Button>

                <Button onClick={this.toggleConfirmForRemove} variant="danger">
                  Remove selected
                </Button>
              </div>
            ) : (
              <Button onClick={this.toggleNewTaskModal} variant="primary">
                Add new Task
              </Button>
            )}
          </Col>
        </Row>

        <Row>{tasksComponents}</Row>

        {/* <Row className="justify-content-center">
          <Button
            className={styles.taskButton + ' mb-4'}
            variant="danger"
            disabled={!checkedTasks.size}
            onClick={this.toggleConfirmForRemove}
          >
            <span>Remove selected</span>
          </Button>
        </Row> */}

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
    );
  }
}

const mapStateToProps = (state) => ({
  tasks: state.task.tasks,
  addTaskSuccess: state.task.addTaskSuccess,
  editTaskSuccess: state.task.editTaskSuccess,
  removeTasksSuccess: state.task.removeTasksSuccess,
});

const mapDispatchToProps = {
  getTasks,
  removeSelectedTasks,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
