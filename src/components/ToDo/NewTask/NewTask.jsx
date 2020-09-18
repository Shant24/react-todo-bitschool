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
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.sendValue();
    }
  };

  render() {
    return (
      <InputGroup>
        <FormControl
          placeholder="Input task"
          aria-label="Input task"
          aria-describedby="basic-addon2"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
        />
        <InputGroup.Append>
          <Button onClick={this.sendValue} variant="outline-primary">
            Add task
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}

NewTask.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default NewTask;
