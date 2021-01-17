import React from 'react';
import { Link } from 'react-router-dom';
import styles from './notFound.module.scss';

function Notfound() {
  return (
    <div className={styles.container}>
      <h1>Error 404</h1>
      <div>This page not found</div>
      <Link to="/">Go to Home</Link>
    </div>
  );
}

export default Notfound;
