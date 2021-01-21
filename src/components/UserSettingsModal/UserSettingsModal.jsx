import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, FormControl, Modal } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { uppercaseFirstLetter } from '../../helpers/utils';
import { updateUserInfo } from '../../store/actions/authActions';

const UserSettingsModal = ({ user, onCancel, updateUserInfo }) => {
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [validName, setValidName] = useState(true);
  const [validSurname, setValidSurname] = useState(true);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [surnameErrorMessage, setSurnameErrorMessage] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const nameRef = useRef();

  useEffect(() => nameRef.current.focus(), []);

  useEffect(() => {
    if (name === user.name && surname === user.surname) {
      setButtonDisabled(true);
    }

    !validName && setNameErrorMessage('Name is required!');
    !validSurname && setSurnameErrorMessage('Surname is required!');
  }, [name, surname, user.name, user.surname, validName, validSurname]);

  const handleChange = (type, value) => {
    if (type === 'name') {
      if (!validName) {
        setValidName(true);
        setNameErrorMessage('');
      }

      value !== user.name && setButtonDisabled(false);

      setName(value);
    } else {
      if (!validSurname) {
        setValidSurname(true);
        setSurnameErrorMessage('');
      }

      value !== user.surname && setButtonDisabled(false);

      setSurname(value);
    }
  };

  const handleSave = () => {
    if (name === '' || surname === '') {
      name === '' && setValidName(false);
      surname === '' && setValidSurname(false);
      return;
    }

    const uppercaseName = uppercaseFirstLetter(name.trim());
    const uppercaseSurname = uppercaseFirstLetter(surname.trim());

    updateUserInfo(uppercaseName, uppercaseSurname);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      show={true}
      onHide={onCancel}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change User Information
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group>
          <Form.Label
            htmlFor="settingsName"
            className="d-flex justify-content-between"
          >
            <b>Name</b>
            {nameErrorMessage && (
              <span className={'text-danger'}>{nameErrorMessage}</span>
            )}
          </Form.Label>
          <FormControl
            ref={nameRef}
            id="settingsName"
            name="name"
            className={!validName && 'invalid'}
            placeholder="Name"
            aria-label="Name"
            aria-describedby="basic-addon2"
            value={name}
            onChange={({ target }) => handleChange(target.name, target.value)}
            onKeyDown={handleKeyDown}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label
            htmlFor="settingsSurname"
            className="d-flex justify-content-between"
          >
            <b>Surname</b>
            {surnameErrorMessage && (
              <span className={'text-danger'}>{surnameErrorMessage}</span>
            )}
          </Form.Label>
          <FormControl
            id="settingsSurname"
            className={!validSurname && 'invalid'}
            name="surname"
            placeholder="Surname"
            aria-label="Surname"
            aria-describedby="basic-addon2"
            value={surname}
            onChange={({ target }) => handleChange(target.name, target.value)}
            onKeyDown={handleKeyDown}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button
          onClick={handleSave}
          variant="success"
          disabled={buttonDisabled}
        >
          Change
        </Button>

        <Button onClick={onCancel} variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

UserSettingsModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ user: state.auth.userInfo });

export default connect(mapStateToProps, { updateUserInfo })(UserSettingsModal);
