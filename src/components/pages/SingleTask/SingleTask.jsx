import React, { PureComponent } from 'react';
// import styles from './singleTask.module.scss';

class SingleTask extends PureComponent {
  state = {
    task: {},
  };

  componentDidMount() {
    fetch(`http://localhost:3001/task/${this.props.match.params.taskId}`)
      .then((res) => res.json())
      .then((task) => {
        if (task.error) {
          throw task.error;
        }

        this.setState({ task });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { title, description } = this.state.task;

    return (
      <>
        <h2>{title}</h2>
        <div>{description}</div>
      </>
    );
  }
}

export default SingleTask;
