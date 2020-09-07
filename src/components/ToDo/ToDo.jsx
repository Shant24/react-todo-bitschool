import React, { Component } from "react";
import s from "./todo.module.scss";
import Task from "../Task/Task";

export default class ToDo extends Component {
  state = {
    tasks: [],
    inputValue: "",
  };

  handleChangeInput = (e) => this.setState({ inputValue: e.target.value });

  handleAddToDoClick = () => {
    const { tasks, inputValue } = this.state;

    inputValue &&
      this.setState({
        tasks: [
          ...tasks,
          {
            id: tasks.length,
            text: inputValue,
            isDone: false,
          },
        ],
        inputValue: "",
      });
  };

  handleRemoveTask = (index) => {
    const { tasks } = this.state;

    const filteredTasks = tasks.filter((e, i) => i !== index);

    this.setState({
      tasks: [...filteredTasks],
    });
  };

  handleCheckboxChange = (index) => {
    const { tasks } = this.state;

    const changedTasks = tasks.map((e, i) => {
      return {
        id: e.id,
        text: e.text,
        isDone: i === index ? !e.isDone : e.isDone,
      };
    });

    this.setState({
      tasks: [...changedTasks],
    });
  };

  render() {
    const toDoTasks = this.state.tasks.map((e, i) => {
      return (
        <Task
          key={i * 100}
          number={i + 1}
          text={e.text}
          isDone={e.isDone}
          handleRemoveTask={() => this.handleRemoveTask(i)}
          handleCheckboxChange={() => this.handleCheckboxChange(i)}
        />
      );
    });

    return (
      <div className={s.toDoContainer}>
        <div className={s.toDoWrapper}>
          <div className={s.toDoHeader}>
            <h1>ToDo App</h1>
          </div>
          <div className={s.addToDoContainer}>
            <input
              onChange={this.handleChangeInput}
              type="text"
              placeholder="Type your task"
              value={this.state.inputValue}
              onKeyDown={(e) => e.key === "Enter" && this.handleAddToDoClick()}
            />
            <button onClick={this.handleAddToDoClick}>Add</button>
          </div>
          <div className={s.tasksContainer}>
            {toDoTasks.length > 0 ? (
              toDoTasks
            ) : (
              <div className={s.noTaskWarning}>No tasks. Add your first task!</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
