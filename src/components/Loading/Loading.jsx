import React from 'react';
import styles from './loading.module.scss';

const Spinner = () => {
  return (
    <div className={styles.loadingContainer}>
      <svg width="205" height="250" viewBox="0 0 41 50">
        <polygon
          strokeWidth="1"
          stroke="#fff"
          fill="none"
          points="20,1 40,40 1,40"
        ></polygon>
        <text fill="#fff" x="7" y="47">
          Loading
        </text>
      </svg>
    </div>
  );
};

export default Spinner;
