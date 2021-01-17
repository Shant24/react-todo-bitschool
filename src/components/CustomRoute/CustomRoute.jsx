import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';
import PropTypes from 'prop-types';

const CustomRoute = ({
  type = 'public',
  isAuthenticated,
  path,
  exact,
  component: Component,
}) => {
  return type === 'private' ? (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  ) : (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

CustomRoute.propTypes = {
  type: PropTypes.oneOf(['public', 'private']),
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(CustomRoute);
