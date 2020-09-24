import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

class NewTask extends PureComponent {
  state = {
    inputValue: '',
  };

  handleInputChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  sendValue = () => {
    const { inputValue } = this.state;

    if (!inputValue) return;

    this.props.onAdd(inputValue);

    this.setState({
      inputValue: '',
    });

    console.log(JSON.stringify({ title: 'Task', description: inputValue, date: `${new Date()}` }));

    fetch('http://localhost:3001/task', {
      method: 'POST',
      // headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: {
        title: 'Task',
        description: inputValue,
        date: `${new Date()}`,
      },
    }).catch((err) => console.log(err));
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.sendValue();
    }
  };

  render() {
    const { disabled } = this.props;

    return (
      <InputGroup>
        <FormControl
          placeholder="Input task"
          aria-label="Input task"
          aria-describedby="basic-addon2"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          disabled={disabled}
        />
        <InputGroup.Append>
          <Button onClick={this.sendValue} variant="outline-primary" disabled={disabled}>
            Add task
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}

NewTask.propTypes = {
  onAdd: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default NewTask;
