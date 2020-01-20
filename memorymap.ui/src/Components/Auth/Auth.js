import React from 'react';
import {
  Button, ButtonToolbar
} from 'react-bootstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import UserData from '../../Helpers/Data/UserData';
import CreateAccountModal from '../CreateAccountModal/CreateAccountModal';
import './Auth.scss';

const defaultUser = {
  email: '',
  password: '',
  firebaseUid: ''
};

class Auth extends React.Component {
  state = {
    userObj: defaultUser,
    firebaseInfo: defaultUser,
    createAccountModalOpen: false,
  }

  logIn = () => {
    UserData.logInUser(firebase.auth().currentUser.uid)
    .then((loggedInUserObj) => {
      this.setState({ userObj: loggedInUserObj });
    }).catch(err => console.error('log in error', err));
}

  render() {
    let closeCreateAccountModel = () => this.setState({ createAccountModalOpen: false })

    return ( 
      <div className="container">
        <div className="row">
          <ButtonToolbar>
            <Button
              className="col btn"
              id="login-button"
              variant="success"
              onClick={this.logIn}>
              Log In
            </Button>
            <Button
              className="col btn"
              id="create-account-button"
              variant='primary'
              onClick={() => this.setState({ createAccountModalOpen: true })}>
              Create Account
            </Button>

            <CreateAccountModal
            show={this.state.createAccountModalOpen}
            onHide={closeCreateAccountModel}
            />
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}

export default Auth;
