import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './todo.module.scss';
import Confirm from '../../Confirm/Confirm';
import NewTask from '../../NewTask/NewTask';
import Task from '../../Task/Task';
import EditTaskModal from '../../EditTaskModal/EditTaskModal';
import Spinner from '../../Spinner/Spinner';
import { connect } from 'react-redux';
import {
  getTasks,
  addTask,
  removeTask,
  toggleNewTaskModal,
  checkTask,
  toggleConfirm,
  removeSelectedTasks,
  checkTaskForEdit,
  saveTaskAfterEdit,
} from '../../../store/reducers/taskReducer';

class ToDo extends Component {
  componentDidMount() {
    this.props.getTasks();
  }

  render() {
    const {
      tasks,
      checkedTasks,
      showConfirm,
      editTask,
      openNewTaskModal,
      addTask,
      removeTask,
      toggleNewTaskModal,
      checkTask,
      toggleConfirm,
      removeSelectedTasks,
      checkTaskForEdit,
      saveTaskAfterEdit,
    } = this.props;

    if (!tasks) {
      return <Spinner />;
    }

    const tasksComponents = tasks.map((task) => {
      return (
        <Col key={task._id} xl={3} lg={4} md={6}>
          <Task
            task={task}
            onRemove={removeTask}
            onCheck={checkTask(task._id)}
            onEdit={checkTaskForEdit(task)}
            disabled={!!checkedTasks.size}
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
            <Button
              onClick={toggleNewTaskModal}
              variant="primary"
              disabled={checkedTasks.size}
            >
              Add new Task
            </Button>
          </Col>
        </Row>

        <Row>{tasksComponents}</Row>

        <Row className="justify-content-center">
          <Button
            className={styles.taskButton + ' mb-4'}
            variant="danger"
            disabled={!checkedTasks.size}
            onClick={toggleConfirm}
          >
            <span>Remove selected</span>
          </Button>
        </Row>

        {showConfirm && (
          <Confirm
            count={checkedTasks.size}
            onSubmit={removeSelectedTasks}
            onCancel={toggleConfirm}
          />
        )}

        {!!editTask && (
          <EditTaskModal
            data={editTask}
            onSave={saveTaskAfterEdit}
            onCancel={checkTaskForEdit(null)}
          />
        )}

        {openNewTaskModal && (
          <NewTask onAdd={addTask} onCancel={toggleNewTaskModal} />
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  tasks: state.task.tasks,
  checkedTasks: state.task.checkedTasks,
  showConfirm: state.task.showConfirm,
  editTask: state.task.editTask,
  openNewTaskModal: state.task.openNewTaskModal,
});

const mapDispatchToProps = {
  getTasks,
  addTask,
  removeTask,
  toggleNewTaskModal,
  checkTask,
  toggleConfirm,
  removeSelectedTasks,
  checkTaskForEdit,
  saveTaskAfterEdit,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
