import React from "react";
import s from "./task.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash);

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.checkBox = React.createRef();
  }

  changeInputCheckedStatus = () => {
    this.props.isDone
      ? this.checkBox.current.setAttribute("checked", "checked")
      : this.checkBox.current.removeAttribute("checked");
  };

  componentDidMount() {
    this.changeInputCheckedStatus();
  }

  componentDidUpdate() {
    this.changeInputCheckedStatus();
  }

  render() {
    return (
      <div className={`${s.taskContainer} ${this.props.isDone && s.done}`}>
        <input
          type="checkbox"
          ref={this.checkBox}
          onChange={() => {}}
          onClick={this.props.handleCheckboxChange}
        />
        <p>{`${this.props.number}. ${this.props.text}`}</p>
        <button onClick={this.props.handleRemoveTask}>
          <FontAwesomeIcon className={s.fontIcon} icon="trash" />
        </button>
      </div>
    );
  }
}

export default Task;
