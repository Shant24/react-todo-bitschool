import React, { memo, useEffect, useState, useRef, useCallback } from 'react';
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 575);

  useEffect(() => {
    !user && isAuthenticated && getUserInfo();
  }, [user, isAuthenticated, getUserInfo]);

  const HandleToggleModal = () => {
    user && setIsSettingsOpen(!isSettingsOpen);
  };

  const handleResize = useCallback(() => {
    if (window.innerWidth <= 575) {
      !isMobile && setIsMobile(true);
    } else if (window.innerWidth > 575) {
      isMobile && setIsMobile(false);
    }
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <header className={styles.header}>
      <Navbar className={styles.navbar} bg="primary" variant="dark" expand="sm">
        <Navbar.Brand>
          <Link to="/" className={styles.logLink}>
            ToDo App
          </Link>
        </Navbar.Brand>

        {isAuthenticated && isMobile && (
          <UserBlock
            customStyle={styles.mobileWrapper}
            user={user}
            logout={logout}
            onToggleModal={HandleToggleModal}
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

            {!isAuthenticated && <AuthBlock customStyle={styles.mobileLink} />}
          </Nav>

          {!isAuthenticated && <AuthBlock customStyle={styles.desktopLink} />}
        </Navbar.Collapse>

        {isAuthenticated && !isMobile && (
          <UserBlock
            customStyle={styles.desktopWrapper}
            user={user}
            logout={logout}
            onToggleModal={HandleToggleModal}
          />
        )}
      </Navbar>

      {isSettingsOpen && user && (
        <UserSettingsModal onCancel={HandleToggleModal} />
      )}
    </header>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.userInfo,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = { logout, getUserInfo };

export default connect(mapStateToProps, mapDispatchToProps)(memo(NavMenu));

function UserBlock({ customStyle, user, logout, onToggleModal }) {
  const [desktopTriangleWidth, setDesktopTriangleWidth] = useState('83.5px');

  const userDesktopWrapperRef = useRef();
  const userMobileWrapperRef = useRef();

  useEffect(() => {
    let setDeskTriangleWidth;
    if (customStyle === styles.desktopWrapper) {
      setDeskTriangleWidth =
        user &&
        setTimeout(() => {
          setDesktopTriangleWidth(
            `${userDesktopWrapperRef.current.offsetWidth / 2}px`
          );
        }, 100);
    }
    return () => {
      if (customStyle === styles.desktopWrapper) {
        clearTimeout(setDeskTriangleWidth);
      }
    };
  }, [customStyle, user]);

  return (
    <div
      ref={
        customStyle === styles.desktopWrapper
          ? userDesktopWrapperRef
          : userMobileWrapperRef
      }
      className={`${styles.userWrapper} ${customStyle}`}
    >
      <div className={styles.userContainer}>
        <div className={styles.userInformation}>
          <FontAwesomeIcon icon={faUserCircle} />

          {user && (
            <div className={styles.userName}>
              {user?.name} {user?.surname}
            </div>
          )}
        </div>

        <div className={styles.userMenu}>
          <span
            className={styles.triangle}
            style={{ right: desktopTriangleWidth }}
          ></span>

          {customStyle === styles.mobileWrapper && user && (
            <div className={styles.userName}>
              {user.name} {user.surname}
            </div>
          )}

          <div
            className={`${styles.buttons} ${styles.settingsBtn}`}
            onClick={onToggleModal}
          >
            Settings
          </div>

          <div
            className={`${styles.buttons} ${styles.logoutBtn}`}
            onClick={logout}
          >
            Log out
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthBlock({ customStyle }) {
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

UserBlock.propTypes = {
  customStyle: PropTypes.string.isRequired,
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
  onToggleModal: PropTypes.func.isRequired,
};

AuthBlock.propTypes = {
  customStyle: PropTypes.string.isRequired,
};
