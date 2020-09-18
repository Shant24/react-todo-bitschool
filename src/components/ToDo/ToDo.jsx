import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import idGenerator from '../helpers/idGenerator';
import classes from './todo.module.scss';

import Confirm from './Confirm/Confirm';
import NewTask from './NewTask/NewTask';
import Task from './Task/Task';

class ToDo extends Component {
  state = {
    tasks: [],
    checkedTasks: new Set(),
    showConfirm: false,
  };

  addTask = (inputValue) => {
    const tasks = [...this.state.tasks];

    const newTask = {
      id: idGenerator(),
      text: inputValue,
    };

    tasks.unshift(newTask);

    this.setState({
      tasks,
    });
  };

  removeTask = (taskId) => () => {
    const newTasks = this.state.tasks.filter((task) => taskId !== task.id);

    this.setState({
      tasks: newTasks,
    });
  };

  editTask = (taskId, newText) => {
    const changedTask = this.state.tasks.map((task) => {
      return task.id === taskId
        ? {
            id: task.id,
            text: newText,
          }
        : task;
    });

    this.setState({
      tasks: changedTask,
    });
  };

  handleOnCheck = (taskId) => () => {
    const checkedTasks = new Set(this.state.checkedTasks);

    checkedTasks.has(taskId) ? checkedTasks.delete(taskId) : checkedTasks.add(taskId);

    this.setState({
      checkedTasks,
    });
  };

  handleRemoveSelected = () => {
    const checkedTasks = new Set(this.state.checkedTasks);

    let tasks = [...this.state.tasks];

    checkedTasks.forEach((taskId) => {
      tasks = tasks.filter((task) => task.id !== taskId);
    });

    checkedTasks.clear();

    this.setState({
      tasks,
      checkedTasks,
      showConfirm: false,
    });
  };

  toggleConfirm = () => {
    this.setState({ showConfirm: !this.state.showConfirm });
  };

  render() {
    const { checkedTasks, tasks, showConfirm } = this.state;

    const tasksComponents = tasks.map((task) => {
      return (
        <Col key={task.id} xl={3} lg={4} md={6}>
          <Task
            task={task}
            editTask={this.editTask}
            removeTask={this.removeTask}
            onCheck={this.handleOnCheck(task.id)}
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
            <h1 className={classes.h1}>ToDo App</h1>
          </Col>

          <Col lg={{ span: 6, offset: 1 }} md={{ span: 10, offset: 1 }} sm={12}>
            <NewTask onAdd={this.addTask} />
          </Col>
        </Row>

        <Row>{tasksComponents}</Row>
        <Row className="justify-content-center">
          <Button
            className={classes.taskButtons}
            variant="danger"
            disabled={checkedTasks.size ? false : true}
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
      </Container>
    );
  }
}

export default ToDo;
