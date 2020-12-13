import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss';
import ToDo from './components/pages/ToDo/ToDo';
import SingleTask from './components/pages/SingleTask/SingleTask';
import NotFound from './components/pages/NotFound/NotFound';
import NavMenu from './components/NavMenu/NavMenu';
import Spinner from './components/Spinner/Spinner';

class App extends PureComponent {
  componentDidUpdate(prevProps) {
    const { successMessage, errorMessage } = this.props;

    successMessage && toast.success(successMessage);
    errorMessage && toast.error(errorMessage);
  }

  render() {
    const { showSpinner } = this.props;
    return (
      <>
        <NavMenu />

        <Switch>
          <Route path="/" exact component={ToDo} />
          <Route path="/task/:taskId" component={SingleTask} />
          <Route path="/not-found" exact component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>

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

        {showSpinner && <Spinner />}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  errorMessage: state.task.errorMessage,
  successMessage: state.task.successMessage,
  showSpinner: state.task.loading,
});

export default connect(mapStateToProps, null)(App);
