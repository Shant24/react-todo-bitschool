import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  InputGroup,
  FormControl,
  Button,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './search.module.scss';
import { getTasks } from '../../store/actions/taskActions';
import { shortStr } from '../../helpers/utils';
import idGenerator from '../../helpers/idGenerator';

const statusOptions = [
  {
    label: 'Unset',
    value: '',
  },
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Done',
    value: 'done',
  },
];

const sortOptions = [
  {
    label: 'Unset',
    value: '',
  },
  {
    label: 'A-Z',
    value: 'a-z',
  },
  {
    label: 'Z-A',
    value: 'z-a',
  },
  {
    label: 'Creation date oldest',
    value: 'creation_date_oldest',
  },
  {
    label: 'Creation date newest',
    value: 'creation_date_newest',
  },
  {
    label: 'Completion date oldest',
    value: 'completion_date_oldest',
  },
  {
    label: 'Completion date newest',
    value: 'completion_date_newest',
  },
];

const dateOptions = [
  {
    label: 'Creation lte',
    value: 'create_lte',
  },
  {
    label: 'Creation gte',
    value: 'create_gte',
  },
  {
    label: 'Completion lte',
    value: 'complete_lte',
  },
  {
    label: 'Completion gte',
    value: 'complete_gte',
  },
];

const Search = (props) => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState({
    label: '',
    value: '',
  });
  const [sort, setSort] = useState({
    label: '',
    value: '',
  });

  const [dates, setDates] = useState({
    create_lte: null,
    create_gte: null,
    complete_lte: null,
    complete_gte: null,
  });

  const handleInputChange = (e) => setSearch(e.target.value);

  const handleSubmit = () => {
    const searchData = {
      search,
      status: status.value,
      sort: sort.value,
    };

    for (let key in dates) {
      dates[key] && (searchData[key] = dates[key].toLocaleDateString());
    }

    props.getTasks(searchData);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={styles.search}>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search for a task..."
          aria-describedby="basic-addon2"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={search}
        />

        <DropdownButton
          as={InputGroup.Append}
          variant="secondary"
          title={status.value ? status.label : 'Status'}
          id="input-group-dropdown-2"
        >
          {statusOptions.map((option) => (
            <Dropdown.Item
              key={idGenerator()}
              active={status.value === option.value}
              onClick={() => setStatus(option)}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>

        <DropdownButton
          as={InputGroup.Append}
          variant="secondary"
          title={sort.value ? shortStr(sort.label, 5) : 'Sort'}
          id="input-group-dropdown-2"
        >
          {sortOptions.map((option) => (
            <Dropdown.Item
              key={idGenerator()}
              active={sort.value === option.value}
              onClick={() => setSort(option)}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>

        <InputGroup.Append>
          <Button variant="primary" onClick={handleSubmit}>
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>

      {dateOptions.map((option) => (
        <div key={idGenerator()}>
          <span>{option.label}</span>
          <DatePicker
            dateFormat="dd.MM.yyyy"
            selected={dates[option.value]}
            onChange={(value) =>
              setDates({
                ...dates,
                [option.value]: value,
              })
            }
          />
        </div>
      ))}
    </div>
  );
};

export default connect(null, { getTasks })(Search);
