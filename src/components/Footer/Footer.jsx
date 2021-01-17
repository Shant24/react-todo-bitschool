import React from 'react';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <span>Powered by Shant Sargsyan with BitSchool</span>
      <span role="img" aria-label="rocket">
        🚀
      </span>
    </div>
  );
};

export default Footer;
