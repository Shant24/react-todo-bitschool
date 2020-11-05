import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
// import idGenerator from '../helpers/idGenerator';
import styles from './todo.module.scss';

import Confirm from './Confirm/Confirm';
import NewTask from './NewTask/NewTask';
import Task from './Task/Task';
import Modal from './Modal/Modal';

class ToDo extends Component {
  state = {
    tasks: [],
    checkedTasks: new Set(),
    showConfirm: false,
    editTask: null,
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
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((task) => {
        if (task.error) {
          throw task.error;
        }

        this.setState({ tasks: [task, ...this.state.tasks] });
      })
      .catch((err) => console.log(err));
  };

  removeTask = (taskId) => () => {
    const newTasks = this.state.tasks.filter((task) => taskId !== task._id);

    this.setState({ tasks: newTasks });
  };

  handleCheck = (taskId) => () => {
    const checkedTasks = new Set(this.state.checkedTasks);

    checkedTasks.has(taskId) ? checkedTasks.delete(taskId) : checkedTasks.add(taskId);

    this.setState({ checkedTasks });
  };

  handleRemoveSelected = () => {
    const checkedTasks = new Set(this.state.checkedTasks);

    let tasks = [...this.state.tasks];

    checkedTasks.forEach((taskId) => (tasks = tasks.filter((task) => task.id !== taskId)));

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

  render() {
    const { checkedTasks, tasks, showConfirm, editTask } = this.state;

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
      <Container fluid>
        <Row className="my-4 align-items-center">
          <Col
            lg={{ span: 2, offset: 0 }}
            md={{ span: 4, offset: 4 }}
            sm={{ span: 2, offset: 4 }}
            className="justify-content-center"
          >
            <h1 className={styles.h1}>ToDo App</h1>
          </Col>

          <Col lg={{ span: 6, offset: 1 }} md={{ span: 10, offset: 1 }} sm={12}>
            <NewTask onAdd={this.addTask} disabled={!!checkedTasks.size} />
          </Col>
        </Row>

        <Row>{tasksComponents}</Row>

        <Row className="justify-content-center">
          <Button
            className={styles.taskButtons}
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
          <Modal value={editTask} onSave={this.handleSave} onCancel={this.handleEdit(null)} />
        )}
      </Container>
    );
  }
}

export default ToDo;
