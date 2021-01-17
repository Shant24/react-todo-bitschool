import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../Register/register.module.scss';
import Loading from '../../Loading/Loading';
import { login } from '../../../store/actions/authActions';
import {
  emailReqError,
  passwordLengthError,
  passwordReqError,
} from '../../../helpers/errors';

const Login = ({ login }) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const [fieldIsActive, setFieldIsActive] = useState({
    email: false,
    password: false,
  });

  const [passwordIsShow, setPasswordIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeValue = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = values;

    if (email && !passwordIsShow) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setPasswordIsShow(true);
      }, 300);
    } else {
      let passwordErrorMessage = null;

      if (!password) {
        passwordErrorMessage = passwordReqError;
      } else if (password.length < 6) {
        passwordErrorMessage = passwordLengthError;
      }

      setErrors({
        email: email ? null : emailReqError,
        password: passwordErrorMessage,
      });

      email && password.length >= 6 && login(values);
    }
  };

  const handleChangeFocus = (e, bool) => {
    const { name, value } = e.currentTarget;
    !value && setFieldIsActive({ ...fieldIsActive, [name]: bool });
  };

  return (
    <div className={styles.container}>
      {isLoading && <Loading />}

      <Container className="h-100">
        <Row className={`${styles.row} ${styles.loginRow}`}>
          <Col xs={12} sm={8} md={6} className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
              <h1>Login</h1>

              <div className={styles.inputContainer}>
                <label
                  className={`${fieldIsActive['email'] && styles.active}`}
                  htmlFor="loginPageEmail"
                >
                  Email
                </label>
                <input
                  id="loginPageEmail"
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

              {passwordIsShow && (
                <div className={styles.inputContainer}>
                  <label
                    className={`${fieldIsActive['password'] && styles.active}`}
                    htmlFor="loginPagePassword"
                  >
                    Password
                  </label>
                  <input
                    autoFocus={true}
                    id="loginPagePassword"
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
              )}

              <div className={styles.submitContainer}>
                <Button variant="primary" type="submit">
                  {passwordIsShow ? 'Login' : 'Continue'}
                </Button>
              </div>

              <div className={styles.linkContainer}>
                Are not you registered yet? <Link to="/register">Register</Link>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default connect(null, { login })(Login);
