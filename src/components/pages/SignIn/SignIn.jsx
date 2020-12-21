import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import styles from './signIn.module.scss';

const SignIn = (props) => {
  if (props.isAuth) {
    return <Redirect to="/" />;
  }
  console.log('Sign in page');
  return (
    <div className={styles.signInContainer}>
      <form className={styles.form}>
        <h1>Sign in</h1>

        <label htmlFor="signInText">Email</label>
        <input id="signInText" type="email" />

        <label htmlFor="signInPassword">Password</label>
        <input id="signInPassword" type="password" />

        <Button type="submit" variant="primary">
          Sign in
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, null)(SignIn);
