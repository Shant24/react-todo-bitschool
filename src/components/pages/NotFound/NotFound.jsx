import React from 'react';
import styles from './notFound.module.scss';

function Notfound() {
  return (
    <div className={styles.container}>
      <h1>Error 404</h1>
      <div>This page not found</div>
    </div>
  );
}

export default Notfound;
