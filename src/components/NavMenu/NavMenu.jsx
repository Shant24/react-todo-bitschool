import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import styles from './navMenu.module.scss';
import './navMenuGlobal.scss';
import { getUserInfo, logout } from '../../store/actions/authActions';
import UserSettingsModal from '../UserSettingsModal/UserSettingsModal';

const NavMenu = (props) => {
  const { user, isAuthenticated, logout, getUserInfo } = props;

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    !user && isAuthenticated && getUserInfo();
  }, [user, isAuthenticated, getUserInfo]);

  const toggleModal = () => {
    user && setIsSettingsOpen(!isSettingsOpen);
  };

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
            user={user}
            logout={logout}
            toggleModal={toggleModal}
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
            user={user}
            logout={logout}
            toggleModal={toggleModal}
          />
        )}
      </Navbar>

      {isSettingsOpen && user && <UserSettingsModal onCancel={toggleModal} />}
    </header>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.userInfo,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = { logout, getUserInfo };

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);

function UserBlok({ customStyle, user, logout, toggleModal }) {
  return (
    <div className={`${styles.userWrapper} ${customStyle}`}>
      <div className={styles.userContainer}>
        <div className={styles.userInformation}>
          <FontAwesomeIcon icon={faUserCircle} />

          {user && (
            <div className={styles.userName}>
              {user.name} {user.surname}
            </div>
          )}
        </div>

        <div className={styles.userMenu}>
          {customStyle === styles.mobileWrapper && user && (
            <div className={styles.userName}>
              {user.name} {user.surname}
            </div>
          )}

          <div
            className={`${styles.buttons}${
              customStyle === styles.desktopWrapper ? ` ${styles.first}` : ''
            }`}
            onClick={toggleModal}
          >
            Settings
          </div>

          <div className={styles.buttons} onClick={logout}>
            Log out
          </div>
        </div>
      </div>
    </div>
  );
}

UserBlok.propTypes = {
  customStyle: PropTypes.string.isRequired,
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

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

AuthBlok.propTypes = {
  customStyle: PropTypes.string.isRequired,
};
