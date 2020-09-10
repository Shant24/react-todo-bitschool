import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Card,
} from 'react-bootstrap';
import idGenerator from '../helpers/idGenerator';

class ToDo extends Component {
  state = {
    inputValue: '',
    tasks: [],
  };

  handleInputChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  addTask = () => {
    const { inputValue } = this.state;

    const tasks = [...this.state.tasks];
    // tasks.push(inputValue);

    const newTask = {
      id: idGenerator(),
      text: inputValue,
    };

    tasks.unshift(newTask);

    this.setState({
      inputValue: '',
      tasks,
    });
  };

  handleKeyDown = (e) => {
    e.key === 'Enter' && this.addTask();
  };

  render() {
    const tasksComponents = this.state.tasks.map((task) => {
      return (
        <Col key={idGenerator()}>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Task</Card.Title>
              <Card.Text>{task.text}</Card.Text>
              <Button variant="primary">Remove</Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });

    return (
      <Container fluid>
        <Row>
          <Col md={2}>
            <h1>ToDo App</h1>
          </Col>
          <Col md={{ span: 6, offset: 1 }}>
            <InputGroup className="my-3">
              <FormControl
                placeholder="Input task"
                aria-label="Input task"
                aria-describedby="basic-addon2"
                value={this.state.inputValue}
                onChange={this.handleInputChange}
                onKeyDown={this.handleKeyDown}
              />
              <InputGroup.Append>
                <Button onClick={this.addTask} variant="outline-primary">
                  Add task
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        <Row>{tasksComponents}</Row>
      </Container>
    );
  }
}

export default ToDo;
