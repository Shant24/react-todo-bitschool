import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import CustomRoute from './components/CustomRoute/CustomRoute';
import ToDo from './components/pages/ToDo/ToDo';
import SingleTask from './components/pages/SingleTask/SingleTask';
import NotFound from './components/pages/NotFound/NotFound';
import NavMenu from './components/NavMenu/NavMenu';
import Loading from './components/Loading/Loading';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import Footer from './components/Footer/Footer';

class App extends PureComponent {
  state = {
    windowHeight: window.innerHeight,
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

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

  handleResize = () => {
    this.setState({ windowHeight: window.innerHeight });
  };

  render() {
    const { showSpinner, showAuthSpinner } = this.props;
    const { windowHeight } = this.state;

    return (
      <div
        className="toDoApplication"
        style={{ minHeight: `${windowHeight}px` }}
      >
        <NavMenu />

        <main>
          <Switch>
            <CustomRoute type="private" path="/" exact component={ToDo} />
            <CustomRoute
              type="private"
              path="/task/:taskId"
              exact={false}
              component={SingleTask}
            />
            <CustomRoute path="/login" exact={false} component={Login} />
            <CustomRoute path="/register" exact={false} component={Register} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/not-found" component={NotFound} />
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

        <Footer />

        {(showSpinner || showAuthSpinner) && <Loading />}
      </div>
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
});

export default connect(mapStateToProps)(App);
