import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './register.module.scss';
import {
  nameReqError,
  surnameReqError,
  emailReqError,
  passwordReqError,
  passwordLengthError,
  passwordConfirmError,
  passwordMatchError,
} from '../../../helpers/errors';
import { register } from '../../../store/actions/authActions';
import { uppercaseFirstLetter } from '../../../helpers/utils';

const Register = ({ register }) => {
  const [values, setValues] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: null,
    surname: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  const [fieldIsActive, setFieldIsActive] = useState({
    name: false,
    surname: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleChangeValue = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });

    setErrors({ ...errors, [name]: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, name, surname } = values;

    let valid = true;

    let passwordMessage = null;
    let confirmPasswordMessage = null;
    let nameMessage = null;
    let surnameMessage = null;

    if (!password) {
      passwordMessage = passwordReqError;
      valid = false;
    } else if (password.length < 6) {
      passwordMessage = passwordLengthError;
      valid = false;
    }

    if (!confirmPassword) {
      confirmPasswordMessage = passwordConfirmError;
      valid = false;
    } else if (password && password !== confirmPassword) {
      confirmPasswordMessage = passwordMatchError;
      valid = false;
    }

    if (!name) {
      nameMessage = nameReqError;
      valid = false;
    }

    if (!surname) {
      surnameMessage = surnameReqError;
      valid = false;
    }

    setErrors({
      email: email ? null : emailReqError,
      password: passwordMessage,
      confirmPassword: confirmPasswordMessage,
      name: nameMessage,
      surname: surnameMessage,
    });

    valid &&
      register({
        ...values,
        name: uppercaseFirstLetter(values.name),
        surname: uppercaseFirstLetter(values.surname),
      });
  };

  const handleChangeFocus = (e, bool) => {
    const { name, value } = e.currentTarget;
    !value && setFieldIsActive({ ...fieldIsActive, [name]: bool });
  };

  return (
    <div className={styles.container}>
      <Container className="h-100">
        <Row className={styles.row}>
          <Col xs={12} sm={8} md={6} className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
              <h1>Register</h1>

              <div className={styles.inputContainer}>
                <label
                  className={`${fieldIsActive['name'] && styles.active}`}
                  htmlFor="registerPageName"
                >
                  Name
                </label>
                <input
                  id="registerPageName"
                  className={errors.name && styles.invalid}
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChangeValue}
                  onFocus={(e) => handleChangeFocus(e, true)}
                  onBlur={(e) => handleChangeFocus(e, false)}
                />
                <small>{errors.name}</small>
              </div>

              <div className={styles.inputContainer}>
                <label
                  className={`${fieldIsActive['surname'] && styles.active}`}
                  htmlFor="registerPageSurname"
                >
                  Surname
                </label>
                <input
                  id="registerPageSurname"
                  className={errors.surname && styles.invalid}
                  type="text"
                  name="surname"
                  value={values.surname}
                  onChange={handleChangeValue}
                  onFocus={(e) => handleChangeFocus(e, true)}
                  onBlur={(e) => handleChangeFocus(e, false)}
                />
                <small>{errors.surname}</small>
              </div>

              <div className={styles.inputContainer}>
                <label
                  className={`${fieldIsActive['email'] && styles.active}`}
                  htmlFor="registerPageEmail"
                >
                  Email
                </label>
                <input
                  id="registerPageEmail"
                  className={errors.email && styles.invalid}
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChangeValue}
                  onFocus={(e) => handleChangeFocus(e, true)}
                  onBlur={(e) => handleChangeFocus(e, false)}
                />
                <small>{errors.email}</small>
              </div>

              <div className={styles.inputContainer}>
                <label
                  className={`${fieldIsActive['password'] && styles.active}`}
                  htmlFor="registerPagePassword"
                >
                  Password
                </label>
                <input
                  autoComplete="new-password"
                  id="registerPagePassword"
                  className={errors.password && styles.invalid}
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChangeValue}
                  onFocus={(e) => handleChangeFocus(e, true)}
                  onBlur={(e) => handleChangeFocus(e, false)}
                />
                <small>{errors.password}</small>
              </div>

              <div className={styles.inputContainer}>
                <label
                  className={`${
                    fieldIsActive['confirmPassword'] && styles.active
                  }`}
                  htmlFor="registerPageConfirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  id="registerPageConfirmPassword"
                  className={errors.confirmPassword && styles.invalid}
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChangeValue}
                  onFocus={(e) => handleChangeFocus(e, true)}
                  onBlur={(e) => handleChangeFocus(e, false)}
                />
                <small>{errors.confirmPassword}</small>
              </div>

              <div className={styles.submitContainer}>
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </div>

              <div className={styles.linkContainer}>
                Are you already registered? <Link to="/login">Login</Link>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default connect(null, { register })(Register);
