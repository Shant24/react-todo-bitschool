import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './notFound.module.scss';

function Notfound({ isAuthenticated }) {
  return (
    <div className={styles.container}>
      <h1>Error 404</h1>
      <div>This page not found</div>
      {isAuthenticated ? (
        <Link to="/">Go to Home page</Link>
      ) : (
        <Link to="/login">Go to Login page</Link>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Notfound);
