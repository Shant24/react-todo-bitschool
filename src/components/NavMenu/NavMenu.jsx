import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './navMenu.module.scss';
import UserAvatar from '../../assets/images/svg/UserAvatar';
import { signOut } from '../../store/actions/authActions';

const NavMenu = (props) => {
  const { user, isAuth, signOut } = props;
  const { name, surname, avatar } = user;

  return (
    <header className={styles.header}>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand>
          <Link to="/" className={styles.logLink}>
            ToDo App
          </Link>
        </Navbar.Brand>

        <Nav className="mr-auto"></Nav>

        {isAuth ? (
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
              <div onClick={signOut}>Sign out</div>
            </div>
          </div>
        ) : (
          <>
            <NavLink
              to="/login"
              exact
              className={styles.link}
              activeClassName={styles.active}
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              exact
              className={styles.link}
              activeClassName={styles.active}
            >
              Register
            </NavLink>
          </>
        )}
      </Navbar>
    </header>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { signOut })(NavMenu);
