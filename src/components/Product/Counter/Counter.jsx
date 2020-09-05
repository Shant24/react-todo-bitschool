import React from "react";
import s from "./counter.module.css";

export default class Counter extends React.Component {
  state = {
    count: 0,
    preventClick: -1,
    nextClick: 1,
  };

  handleButtonClick = (type) => {
    let { count } = this.state;

    if (type === "inc") {
      count++;
    } else if (type === "dec") {
      count--;
      if (count < 0) {
        return;
      }
    }

    // this.setState({ count }, () => {
    //   console.log("count from callback", this.state.count);
    // });

    this.setState({ count });
  };

  render() {
    return (
      <div className={s.counterContainer}>
        <button onClick={() => this.handleButtonClick("dec")}>Decrement -</button>
        <span>{this.state.count}</span>
        <button onClick={() => this.handleButtonClick("inc")}>Increment +</button>
      </div>
    );
  }
}
