import React from 'react';
import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './navMenu.module.scss';

const NavMenu = () => {
  return (
    <header>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand>
          <NavLink
            to="/"
            exact
            className={styles.link}
            activeClassName={styles.active}
          >
            Home
          </NavLink>
        </Navbar.Brand>
      </Navbar>
    </header>
  );
};

export default NavMenu;
