import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../Register/register.module.scss';
import Loading from '../../Loading/Loading';

const Login = () => {
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

  useEffect(() => {
    if (values.email && !fieldIsActive.email) {
      setFieldIsActive({ ...fieldIsActive, email: true });
    }

    if (values.password && !fieldIsActive.password) {
      setFieldIsActive({ ...fieldIsActive, password: true });
    }
  }, [fieldIsActive, values]);

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
        passwordErrorMessage = 'Password is required!';
      } else if (password.length < 6) {
        passwordErrorMessage = 'Password length must be 6 characters or more!';
      }

      setErrors({
        email: email ? null : 'Email is required!',
        password: passwordErrorMessage,
      });
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
        <Row className={styles.row}>
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

export default Login;
