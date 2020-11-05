import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './todo.module.scss';

import Confirm from '../Confirm/Confirm';
import NewTask from '../NewTask/NewTask';
import Task from '../Task/Task';
import Modal from '../Modal/Modal';

class ToDo extends Component {
  state = {
    tasks: [],
    checkedTasks: new Set(),
    showConfirm: false,
    editTask: null,
    openNewTaskModal: false,
  };

  componentDidMount() {
    this.getServerTasks();
  }

  getServerTasks = () => {
    fetch('http://localhost:3001/task')
      .then((res) => res.json())
      .then((task) => {
        if (task.error) {
          throw task.error;
        }

        this.setState({ tasks: task.reverse() });
      })
      .catch((err) => console.log(err));
  };

  addTask = async (inputValue) => {
    const data = {
      title: inputValue,
    };

    fetch('http://localhost:3001/task', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((task) => {
        if (task.error) {
          throw task.error;
        }

        this.setState({
          tasks: [task, ...this.state.tasks],
          openNewTaskModal: false,
        });
      })
      .catch((err) => console.log(err));
  };

  removeTask = (taskId) => () => {
    const newTasks = this.state.tasks.filter((task) => taskId !== task._id);

    this.setState({ tasks: newTasks });
  };

  handleCheck = (taskId) => () => {
    const checkedTasks = new Set(this.state.checkedTasks);

    checkedTasks.has(taskId)
      ? checkedTasks.delete(taskId)
      : checkedTasks.add(taskId);

    this.setState({ checkedTasks });
  };

  handleRemoveSelected = () => {
    const checkedTasks = new Set(this.state.checkedTasks);

    let tasks = [...this.state.tasks];

    checkedTasks.forEach(
      (taskId) => (tasks = tasks.filter((task) => task.id !== taskId))
    );

    checkedTasks.clear();

    this.setState({
      tasks,
      checkedTasks,
      showConfirm: false,
    });
  };

  toggleConfirm = () => this.setState({ showConfirm: !this.state.showConfirm });

  handleEdit = (task) => () => this.setState({ editTask: task });

  handleSave = (taskId, value) => {
    const tasks = [...this.state.tasks];

    const taskIndex = tasks.findIndex((task) => task._id === taskId);

    tasks[taskIndex] = { ...tasks[taskIndex], text: value };

    this.setState({ tasks, editTask: null });
  };

  toggleNewTaskModal = () => {
    this.setState({
      openNewTaskModal: !this.state.openNewTaskModal,
    });
  };

  render() {
    const {
      checkedTasks,
      tasks,
      showConfirm,
      editTask,
      openNewTaskModal,
    } = this.state;

    const tasksComponents = tasks.map((task) => {
      return (
        <Col key={task._id} xl={3} lg={4} md={6}>
          <Task
            task={task}
            removeTask={this.removeTask}
            onCheck={this.handleCheck(task._id)}
            onEdit={this.handleEdit(task)}
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
              onClick={this.toggleNewTaskModal}
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
            onClick={this.toggleConfirm}
          >
            <span>Remove selected</span>
          </Button>
        </Row>

        {showConfirm && (
          <Confirm
            count={checkedTasks.size}
            onSubmit={this.handleRemoveSelected}
            onCancel={this.toggleConfirm}
          />
        )}

        {!!editTask && (
          <Modal
            value={editTask}
            onSave={this.handleSave}
            onCancel={this.handleEdit(null)}
          />
        )}

        {openNewTaskModal && (
          <NewTask onAdd={this.addTask} onCancel={this.toggleNewTaskModal} />
        )}
      </Container>
    );
  }
}

export default ToDo;
