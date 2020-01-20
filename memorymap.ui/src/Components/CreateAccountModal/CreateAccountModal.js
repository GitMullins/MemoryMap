import React from 'react';
import {
  Modal, Button, Form
} from 'react-bootstrap';
import 'firebase/auth';
import UserData from '../../Helpers/Data/UserData';

const defaultUser = {
  email: '',
  password: '',
  firebaseUid: ''
};

class CreateAccountModal extends React.Component {
  state = {
    newUser: defaultUser,
    firebaseInfo: defaultUser,
  }

  createAccount = (e) => {
    e.preventDefault();
    document.getElementById('closeModal').click();
    const { newUser, firebaseInfo } = this.state;
    UserData.addUser(newUser, firebaseInfo)
  }

  formFieldStringState = (e) => {
    const tempUser = { ...this.state.newUser };
    tempUser[e.target.type] = e.target.value;
    this.setState({ newUser: tempUser, firebaseInfo: tempUser });
  }

  render() {
  
    return (

      <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={this.createAccount}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"
            onChange={this.formFieldStringState}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"
            onChange={this.formFieldStringState}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" id="closeModal" onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    );
  }
}

export default CreateAccountModal;
