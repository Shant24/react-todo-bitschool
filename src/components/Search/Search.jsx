import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  InputGroup,
  FormControl,
  Button,
  DropdownButton,
  Dropdown,
  FormGroup,
  Form,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
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
    label: 'Creation before',
    value: 'create_lte',
  },
  {
    label: 'Creation after',
    value: 'create_gte',
  },
  {
    label: 'Completion before',
    value: 'complete_lte',
  },
  {
    label: 'Completion after',
    value: 'complete_gte',
  },
];

const Search = (props) => {
  const [showSearch, setShowSearch] = useState(false);
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

  const handleReset = () => {
    setSearch('');
    setStatus({ label: '', value: '' });
    setSort({ label: '', value: '' });
    setDates({
      create_lte: null,
      create_gte: null,
      complete_lte: null,
      complete_gte: null,
    });
  };

  return (
    <div className={styles.search}>
      <InputGroup className="mb-2">
        <FormControl
          placeholder="Search for a task..."
          aria-describedby="basic-addon2"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={search}
        />

        {(search ||
          status.value ||
          sort.value ||
          dates.complete_gte ||
          dates.complete_lte ||
          dates.create_gte ||
          dates.create_lte) && (
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip>
                <strong>Reset</strong>
              </Tooltip>
            }
          >
            <InputGroup.Append>
              <Button
                className={styles.searchButtons}
                onClick={handleReset}
                variant="danger"
              >
                &times;
              </Button>
            </InputGroup.Append>
          </OverlayTrigger>
        )}

        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip>
              <strong>Advanced search</strong>
            </Tooltip>
          }
        >
          <InputGroup.Append>
            <Button
              className={styles.searchButtons}
              onClick={() => setShowSearch(!showSearch)}
              variant="success"
            >
              {/* Advanced */}
              <FontAwesomeIcon icon={showSearch ? faCaretUp : faCaretDown} />
            </Button>
          </InputGroup.Append>
        </OverlayTrigger>

        <InputGroup.Append>
          <Button variant="primary" onClick={handleSubmit}>
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>

      {showSearch && (
        <div className={styles.advancedSearch}>
          <div className={styles.dropDown}>
            <label htmlFor="input-group-dropdown-1">Status</label>

            <DropdownButton
              as={InputGroup.Append}
              variant="primary"
              title={status.value ? status.label : 'Unset'}
              id="input-group-dropdown-1"
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
          </div>

          <div className={styles.dropDown}>
            <label htmlFor="input-group-dropdown-2">Sort</label>

            <DropdownButton
              as={InputGroup.Append}
              variant="primary"
              title={sort.value ? shortStr(sort.label, 10) : 'Unset'}
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
          </div>

          {dateOptions.map((option, i) => (
            <FormGroup key={idGenerator()} className={`${styles.datePicker}`}>
              <Form.Label htmlFor={`searchDate${i + 1}`}>
                {option.label}
              </Form.Label>
              <DatePicker
                id={`searchDate${i + 1}`}
                dateFormat="dd.MM.yyyy"
                selected={dates[option.value]}
                onChange={(value) =>
                  setDates({
                    ...dates,
                    [option.value]: value,
                  })
                }
                placeholderText="Set Date"
              />
            </FormGroup>
          ))}
        </div>
      )}
    </div>
  );
};

export default connect(null, { getTasks })(Search);
