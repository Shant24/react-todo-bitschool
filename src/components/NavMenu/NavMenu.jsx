import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './navMenu.module.scss';

const NavMenu = () => {
  return (
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
      <Nav className="mr-auto">
        <NavLink
          to="/task"
          className={styles.link}
          activeClassName={styles.active}
        >
          Task
        </NavLink>
      </Nav>
    </Navbar>
  );
};

export default NavMenu;
