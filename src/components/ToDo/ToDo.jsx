import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import idGenerator from '../helpers/idGenerator';
import NewTask from './NewTask';
import Task from './Task';
import classes from './todo.module.scss';

class ToDo extends Component {
  state = {
    tasks: [],
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
    // TODO: accept 'alt + enter' on the text

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

  render() {
    const tasksComponents = this.state.tasks.map((task) => {
      return (
        <Col key={task.id} className="mb-3" xl={3} lg={4} md={5}>
          <Task task={task} editTask={this.editTask} removeTask={this.removeTask} />
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

          <Col lg={{ span: 6, offset: 1 }} sm={{ span: 10, offset: 1 }}>
            <NewTask onAdd={this.addTask} />
          </Col>
        </Row>

        <Row>{tasksComponents}</Row>
      </Container>
    );
  }
}

export default ToDo;
