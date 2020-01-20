import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';


import Auth from '../Auth/Auth';
import Home from '../Home/Home';
import './App.scss';

import fbConnect from '../../Helpers/Data/fbConnection';

fbConnect();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  // props contains Location, Match, and History
  const routeChecker = props => (authed === false ? <Component authed={authed}{...props} {...rest}/> : <Redirect to={{ pathname: '/home', state: { from: props.location } }} />);
  return <Route {...rest} render={props => routeChecker(props)} />; 
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  // props contains Location, Match, and History
  const routeChecker = props => (authed === true ? <Component authed={authed} {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const defaultUser = {
  email: '',
  firebaseUid: ''
}

class App extends React.Component {
  state = {
    authed: false,
    userObj: defaultUser
  };

  componentDidMount () {
    const { userObj } = this.state;
    if (userObj.email === '')
    {
      firebase.auth().signOut();
    }
   this.removeListener = firebase.auth().onAuthStateChanged((user) => {
     if (user) {
       this.setState({ authed: true });
     } else {
       this.setState({ authed: false, userObj: defaultUser });
     }
   });
 };


  render(){
    const { authed, userObj } = this.state;

    return (
      <div className="App">
        <Router>
          <Switch>
            <PublicRoute path='/auth' component={ Auth } authed={authed} userObj={userObj} />
            <PrivateRoute path='/home' component={ Home } authed={authed} userObj={userObj} />
            <Redirect from='*' to='/auth'/>
          </Switch>
        </Router>
    </div>
    );
  }
}

export default App;
