import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
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

  return (
    <div className={styles.container}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6} className={styles.formContainer}>
            <Form onSubmit={handleSubmit}>
              <h1>Register</h1>

              <Form.Group
                className={styles.formGroup}
                controlId="registerEmail"
              >
                <Form.Control
                  className={errors.email && styles.invalid}
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={values.email}
                  onChange={handleChangeValue}
                />
                <Form.Text>{errors.email}</Form.Text>
              </Form.Group>

              <Form.Group
                className={styles.formGroup}
                controlId="registerPassword"
              >
                <Form.Control
                  className={errors.password && styles.invalid}
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChangeValue}
                />
                <Form.Text>{errors.password}</Form.Text>
              </Form.Group>

              <Form.Group
                className={styles.formGroup}
                controlId="registerConfirmPassword"
              >
                <Form.Control
                  className={errors.confirmPassword && styles.invalid}
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChangeValue}
                />
                <Form.Text>{errors.confirmPassword}</Form.Text>
              </Form.Group>

              <div className={styles.submitContainer}>
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
