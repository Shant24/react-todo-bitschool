import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './navMenu.module.scss';
import './navMenuGlobal.scss';
import UserAvatar from '../../assets/images/svg/UserAvatar';
import { logout } from '../../store/actions/authActions';

const NavMenu = ({ user, isAuthenticated, logout }) => {
  const { name, surname, avatar } = user;

  return (
    <header className={styles.header}>
      <Navbar bg="primary" variant="dark" expand="sm">
        <Navbar.Brand>
          <Link to="/" className={styles.logLink}>
            ToDo App
          </Link>
        </Navbar.Brand>

        {isAuthenticated && (
          <UserBlok
            customStyle={styles.mobileWrapper}
            avatar={avatar}
            name={name}
            surname={surname}
          />
        )}

        <Navbar.Toggle aria-controls="headerNavbar" />

        <Navbar.Collapse id="headerNavbar">
          <Nav className="mr-auto">
            {isAuthenticated && (
              <NavLink
                to="/"
                exact
                className={styles.link}
                activeClassName={styles.active}
              >
                Home
              </NavLink>
            )}

            <NavLink
              to="/about"
              exact
              className={styles.link}
              activeClassName={styles.active}
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              exact
              className={styles.link}
              activeClassName={styles.active}
            >
              Contact
            </NavLink>

            {!isAuthenticated && <AuthBlok customStyle={styles.mobileLink} />}
          </Nav>

          {!isAuthenticated && <AuthBlok customStyle={styles.desktopLink} />}
        </Navbar.Collapse>

        {isAuthenticated && (
          <UserBlok
            customStyle={styles.desktopWrapper}
            avatar={avatar}
            name={name}
            surname={surname}
          />
        )}
      </Navbar>
    </header>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(NavMenu);

function UserBlok({ customStyle, avatar, name, surname }) {
  return (
    <div className={`${styles.userWrapper} ${customStyle}`}>
      <div className={styles.userContainer}>
        <div className={styles.userInformation}>
          {avatar ? (
            <img src={avatar} alt={`${name}'s avatar`} />
          ) : (
            <UserAvatar />
          )}
          <div className={styles.userName}>
            {name} {surname}
          </div>
        </div>
        <div className={styles.userMenu}>
          <Link to="user-settings">Settings</Link>
          <div onClick={logout}>Log out</div>
        </div>
      </div>
    </div>
  );
}

function AuthBlok({ customStyle }) {
  return (
    <>
      <NavLink
        to="/login"
        exact
        className={`${styles.link} ${customStyle}`}
        activeClassName={styles.active}
      >
        Login
      </NavLink>

      <NavLink
        to="/register"
        exact
        className={`${styles.link} ${customStyle}`}
        activeClassName={styles.active}
      >
        Register
      </NavLink>
    </>
  );
}
