import React, { memo, useEffect, useState } from 'react';
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

const App = (props) => {
  const { showSpinner, showAuthSpinner } = props;

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const handleResize = () => setWindowHeight(window.innerHeight);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    props.successMessage && toast.success(props.successMessage);
    props.errorMessage && toast.error(props.errorMessage);
    props.authSuccessMessage && toast.success(props.authSuccessMessage);
    props.authErrorMessage && toast.error(props.authErrorMessage);
  }, [
    props.authErrorMessage,
    props.authSuccessMessage,
    props.errorMessage,
    props.successMessage,
  ]);

  return (
    <div className="toDoApplication" style={{ minHeight: `${windowHeight}px` }}>
      <NavMenu />

      <main>
        <Switch>
          <CustomRoute type="private" path="/" exact component={ToDo} />
          <CustomRoute
            type="private"
            path="/task/:taskId"
            component={SingleTask}
          />
          <CustomRoute path="/login" component={Login} />
          <CustomRoute path="/register" component={Register} />
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
};

const mapStateToProps = (state) => ({
  errorMessage: state.task.errorMessage,
  successMessage: state.task.successMessage,
  authErrorMessage: state.auth.errorMessage,
  authSuccessMessage: state.auth.successMessage,
  showSpinner: state.task.loading,
  showAuthSpinner: state.auth.loading,
});

export default connect(mapStateToProps)(memo(App));
