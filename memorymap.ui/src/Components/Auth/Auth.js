import React from 'react';
import {
  Form, ModalBody, ModalFooter, Button, FormGroup, Input, Label
} from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import UserData from '../../Helpers/Data/UserData';

const defaultUser = {
  email: 'a14@gmail.com',
  password: 'abcd12345',
};

class Auth extends React.Component {
  state = {
    newUserObj: defaultUser,
    firebaseInfo: defaultUser,
    createAccountModalOpen: false,
  }

  createAccount = () => {
    const { newUserObj, firebaseInfo } = this.state;
    UserData.addUser(newUserObj, firebaseInfo);
  }

  render() {

    return ( 
      <div>
        <button onClick={this.createAccount}>
          Create Account
        </button>
      </div>
    );
  }
}
export default Auth;
