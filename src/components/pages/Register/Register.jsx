import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './register.module.scss';

const Register = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null,
    confirmPassword: null,
  });

  const [fieldIsActive, setFieldIsActive] = useState({
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
    const { email, password, confirmPassword } = values;

    let passwordMessage = null;
    let confirmPasswordMessage = null;

    if (!password) {
      passwordMessage = 'Password is required!';
    } else if (password.length < 6) {
      passwordMessage = 'Password length must be 6 characters or more!';
    }

    if (!confirmPassword) {
      confirmPasswordMessage = 'Please, confirm password!';
    } else if (password && password !== confirmPassword) {
      confirmPasswordMessage = "Password didn't match!";
    }

    setErrors({
      email: email ? null : 'Email is required!',
      password: passwordMessage,
      confirmPassword: confirmPasswordMessage,
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

export default Register;
