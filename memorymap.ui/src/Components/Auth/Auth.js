import React from 'react';
import {
  Button, Form
} from 'react-bootstrap';
import CreateAccountModal from '../CreateAccountModal/CreateAccountModal';
import './Auth.scss';

const defaultUser = {
  id: '',
  email: '',
  password: '',
  firebaseUid: ''
};

class Auth extends React.Component {
  state = {
    userObj: defaultUser,
    createAccountModalOpen: false,
  }

  sendLogInInfo = (e) => {
    e.preventDefault();
    const { userObj } = this.state;
    this.props.logIn(userObj);
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
          <Form onSubmit={this.sendLogInInfo}>
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
