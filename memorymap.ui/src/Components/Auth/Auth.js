import React from 'react';
import {
  Button, ButtonToolbar, Form
} from 'react-bootstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import UserData from '../../Helpers/Data/UserData';
import CreateAccountModal from '../CreateAccountModal/CreateAccountModal';
import './Auth.scss';

const defaultUser = {
  email: '',
  password: '',
};

class Auth extends React.Component {
  state = {
    userObj: defaultUser,
    createAccountModalOpen: false,
  }

  logIn = (e) => {
    e.preventDefault();
    const { userObj } = this.state;
    firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
        .then(cred => cred.user.getIdToken())
        .then(token => sessionStorage.setItem('token', token))
        .then(() => UserData.logInUser(firebase.auth().currentUser.uid))
        .then((loggedInUserObj) => this.setState({ userObj: loggedInUserObj }))
        .catch(err => console.error('log in error', { error: err.message}));
  }

  formFieldStringState = (e) => {
    const tempUser = { ...this.state.userObj };
    tempUser[e.target.type] = e.target.value;
    this.setState({ userObj: tempUser });
  }

  render() {
    let closeCreateAccountModel = () => this.setState({ createAccountModalOpen: false })

    return ( 
      <div className="container">
        <div className="row">
          <Form onSubmit={this.logIn}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
              onChange={this.formFieldStringState}
              type="email"
              placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
              onChange={this.formFieldStringState}
              type="password"
              placeholder="Password" />
            </Form.Group>

            <Button variant="success" type="submit">
              Log In
            </Button>
            <Button
              className="btn"
              id="create-account-button"
              variant='primary'
              onClick={() => this.setState({ createAccountModalOpen: true })}>
              Create Account
            </Button>
          </Form>
              {/* <Button
              className="col btn"
              id="login-button"
              variant="success"
              onClick={this.logIn}>
              Log In
            </Button> */}
            {/* <Button
              className="col btn"
              id="create-account-button"
              variant='primary'
              onClick={() => this.setState({ createAccountModalOpen: true })}>
              Create Account
            </Button> */}
            <CreateAccountModal
            show={this.state.createAccountModalOpen}
            onHide={closeCreateAccountModel}
            />
        </div>
      </div>
    );
  }
}

export default Auth;
