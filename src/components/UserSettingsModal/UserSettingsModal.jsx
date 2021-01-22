import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, FormControl, Modal } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './userSettingsModal.module.scss';
import { uppercaseFirstLetter } from '../../helpers/utils';
import {
  userIsEditMode,
  passwordIsEditMode,
  updateUserInfo,
  updateUserPassword,
} from '../../store/actions/authActions';
import * as err from '../../helpers/errors';

const UserSettingsModal = ({
  user,
  onCancel,
  isUserEditMode,
  isPasswordEditMode,
  userIsEditMode,
  passwordIsEditMode,
  updateUserInfo,
  updateUserPassword,
}) => {
  const [values, setValues] = useState({
    name: user.name,
    surname: user.surname,
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [errors, setErrors] = useState({
    name: null,
    surname: null,
    oldPassword: null,
    newPassword: null,
    confirmNewPassword: null,
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const nameRef = useRef();
  const oldPasswordRef = useRef();

  useEffect(() => {
    isUserEditMode && nameRef.current.focus();
    isPasswordEditMode && oldPasswordRef.current.focus();
  }, [isUserEditMode, isPasswordEditMode]);

  useEffect(() => {
    if (values.name === user.name && values.surname === user.surname) {
      setButtonDisabled(true);
    }
  }, [user.name, user.surname, values.name, values.surname]);

  useEffect(() => {
    !isPasswordEditMode &&
      values.oldPassword &&
      setValues({
        ...values,
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
  }, [isPasswordEditMode, values]);

  const handleChange = (name, value, type) => {
    setErrors({ ...errors, [name]: null });
    value !== user[name] && type && setButtonDisabled(false);

    setValues({
      ...values,
      [name]: type ? uppercaseFirstLetter(value) : value,
    });
  };

  const validationCheck = (type) => {
    const {
      name,
      surname,
      oldPassword,
      newPassword,
      confirmNewPassword,
    } = values;

    let valid = true;

    if (type === 'user') {
      let nameError = null;
      let surnameError = null;

      if (!name) {
        nameError = err.nameReqError;
        valid = false;
      }

      if (!surname) {
        surnameError = err.surnameReqError;
        valid = false;
      }

      setErrors({
        ...errors,
        name: nameError,
        surname: surnameError,
      });
    } else if (type === 'password') {
      let oldPasswordError = null;
      let newPasswordError = null;
      let confirmPasswordError = null;

      if (!oldPassword) {
        oldPasswordError = err.oldPasswordReqError;
        valid = false;
      } else if (oldPassword.length < 6) {
        oldPasswordError = err.passwordLengthError;
        valid = false;
      }

      if (!newPassword) {
        newPasswordError = err.newPasswordReqError;
        valid = false;
      } else if (newPassword.length < 6) {
        newPasswordError = err.passwordLengthError;
        valid = false;
      } else if (newPassword === oldPassword) {
        newPasswordError = err.passwordSameError;
        valid = false;
      }

      if (!confirmNewPassword) {
        confirmPasswordError = err.passwordConfirmError;
        valid = false;
      } else if (confirmNewPassword.length < 6) {
        confirmPasswordError = err.passwordLengthError;
        valid = false;
      } else if (newPassword !== confirmNewPassword) {
        confirmPasswordError = err.passwordMatchError;
        valid = false;
      }

      setErrors({
        ...errors,
        oldPassword: oldPasswordError,
        newPassword: newPasswordError,
        confirmNewPassword: confirmPasswordError,
      });
    }

    return valid;
  };

  const handleUserSave = (type) => {
    const {
      name,
      surname,
      oldPassword,
      newPassword,
      confirmNewPassword,
    } = values;

    if (!validationCheck(type)) {
      return;
    }

    type === 'user' && updateUserInfo(name.trim(), surname.trim());

    type === 'password' &&
      updateUserPassword(oldPassword, newPassword, confirmNewPassword);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUserSave('user');
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
          User Settings
        </Modal.Title>
      </Modal.Header>

      {!isPasswordEditMode && (
        <Modal.Body>
          <Form.Group>
            <Form.Label
              htmlFor="settingsName"
              className="d-flex justify-content-between align-items-center"
            >
              <b>Name</b>
              {errors.name && (
                <span className={`text-danger ${styles.invalidText}`}>
                  {errors.name}
                </span>
              )}
            </Form.Label>
            <FormControl
              ref={nameRef}
              id="settingsName"
              name="name"
              className={errors.name ? 'invalid' : ''}
              placeholder="Name"
              aria-label="Name"
              aria-describedby="basic-addon2"
              value={values.name}
              onChange={({ target }) =>
                handleChange(target.name, target.value, 'user')
              }
              onKeyDown={handleKeyDown}
              readOnly={!isUserEditMode}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label
              htmlFor="settingsSurname"
              className="d-flex justify-content-between align-items-center"
            >
              <b>Surname</b>
              {errors.surname && (
                <span className={`text-danger ${styles.invalidText}`}>
                  {errors.surname}
                </span>
              )}
            </Form.Label>
            <FormControl
              id="settingsSurname"
              className={errors.surname ? 'invalid' : ''}
              name="surname"
              placeholder="Surname"
              aria-label="Surname"
              aria-describedby="basic-addon2"
              value={values.surname}
              onChange={({ target }) =>
                handleChange(target.name, target.value, 'user')
              }
              onKeyDown={handleKeyDown}
              readOnly={!isUserEditMode}
            />
          </Form.Group>
        </Modal.Body>
      )}

      {isPasswordEditMode && (
        <Modal.Body>
          <Form.Group>
            <Form.Label
              htmlFor="settingsOldPassword"
              className="d-flex justify-content-between align-items-center"
            >
              <b>Old password</b>
              {errors.oldPassword && (
                <span className={`text-danger ${styles.invalidText}`}>
                  {errors.oldPassword}
                </span>
              )}
            </Form.Label>
            <FormControl
              ref={oldPasswordRef}
              id="settingsOldPassword"
              className={errors.oldPassword ? 'invalid' : ''}
              type="password"
              name="oldPassword"
              placeholder="Old password"
              aria-label="oldPassword"
              aria-describedby="basic-addon2"
              value={values.oldPassword}
              onChange={({ target }) => handleChange(target.name, target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label
              htmlFor="settingsNewPassword"
              className="d-flex justify-content-between align-items-center"
            >
              <b>New password</b>
              {errors.newPassword && (
                <span className={`text-danger ${styles.invalidText}`}>
                  {errors.newPassword}
                </span>
              )}
            </Form.Label>
            <FormControl
              id="settingsNewPassword"
              className={errors.newPassword ? 'invalid' : ''}
              type="password"
              autoComplete="new-password"
              name="newPassword"
              placeholder="New password"
              aria-label="newPassword"
              aria-describedby="basic-addon2"
              value={values.newPassword}
              onChange={({ target }) => handleChange(target.name, target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label
              htmlFor="settingsConfirmNewPassword"
              className="d-flex justify-content-between align-items-center"
            >
              <b>Confirm new password</b>
              {errors.confirmNewPassword && (
                <span className={`text-danger ${styles.invalidText}`}>
                  {errors.confirmNewPassword}
                </span>
              )}
            </Form.Label>
            <FormControl
              id="settingsConfirmNewPassword"
              className={errors.confirmNewPassword ? 'invalid' : ''}
              type="password"
              autoComplete="new-password"
              name="confirmNewPassword"
              placeholder="Confirm new password"
              aria-label="confirmNewPassword"
              aria-describedby="basic-addon2"
              value={values.confirmNewPassword}
              onChange={({ target }) => handleChange(target.name, target.value)}
            />
          </Form.Group>
        </Modal.Body>
      )}

      <Modal.Footer>
        {!isUserEditMode && !isPasswordEditMode && (
          <>
            <Button
              onClick={() => {
                passwordIsEditMode(true);
                userIsEditMode(false);
              }}
              variant="warning"
            >
              Change Password
            </Button>

            <Button
              onClick={() => {
                passwordIsEditMode(false);
                userIsEditMode(true);
              }}
              variant="info"
            >
              Edit User
            </Button>

            <Button onClick={onCancel} variant="secondary">
              Close
            </Button>
          </>
        )}

        {isUserEditMode && (
          <>
            <Button
              onClick={() => handleUserSave('user')}
              variant="success"
              disabled={buttonDisabled}
            >
              Save
            </Button>

            <Button onClick={() => userIsEditMode(false)} variant="secondary">
              Cancel
            </Button>
          </>
        )}

        {isPasswordEditMode && (
          <>
            <Button
              onClick={() => handleUserSave('password')}
              variant="success"
            >
              Save
            </Button>

            <Button
              onClick={() => {
                passwordIsEditMode();
                userIsEditMode(false);
              }}
              variant="secondary"
            >
              Cancel
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

UserSettingsModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.userInfo,
  isUserEditMode: state.auth.isUserEditMode,
  isPasswordEditMode: state.auth.isPasswordEditMode,
});

const mapDispatchToProps = {
  userIsEditMode,
  passwordIsEditMode,
  updateUserInfo,
  updateUserPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsModal);
