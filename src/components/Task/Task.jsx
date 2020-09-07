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
    const { isDone, number, text, handleCheckboxChange, handleRemoveTask } = this.props;

    return (
      <div className={`${s.taskContainer} ${isDone && s.done}`}>
        <input
          type="checkbox"
          ref={this.checkBox}
          onChange={() => {}}
          onClick={handleCheckboxChange}
        />
        <p>{`${number}. ${text}`}</p>
        <button onClick={handleRemoveTask}>
          <FontAwesomeIcon className={s.fontIcon} icon="trash" />
        </button>
      </div>
    );
  }
}

export default Task;
