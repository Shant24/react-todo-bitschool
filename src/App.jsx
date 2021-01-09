import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ToDo from './components/pages/ToDo/ToDo';
import SingleTask from './components/pages/SingleTask/SingleTask';
import NotFound from './components/pages/NotFound/NotFound';
import NavMenu from './components/NavMenu/NavMenu';
import Loading from './components/Loading/Loading';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';

class App extends PureComponent {
  componentDidUpdate() {
    const {
      successMessage,
      errorMessage,
      authSuccessMessage,
      authErrorMessage,
    } = this.props;

    successMessage && toast.success(successMessage);
    errorMessage && toast.error(errorMessage);
    authSuccessMessage && toast.success(authSuccessMessage);
    authErrorMessage && toast.error(authErrorMessage);
  }

  render() {
    const { showSpinner, showAuthSpinner, isAuth } = this.props;

    return (
      <>
        <NavMenu />

        {!isAuth && <Redirect to="/login" />}

        <main>
          <Switch>
            <Route path="/" exact component={ToDo} />
            <Route path="/task/:taskId" exact component={SingleTask} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/not-found" exact component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </main>

        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        {(showSpinner || showAuthSpinner) && <Loading />}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  errorMessage: state.task.errorMessage,
  successMessage: state.task.successMessage,
  authErrorMessage: state.auth.errorMessage,
  authSuccessMessage: state.auth.successMessage,
  showSpinner: state.task.loading,
  showAuthSpinner: state.auth.loading,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, null)(App);
