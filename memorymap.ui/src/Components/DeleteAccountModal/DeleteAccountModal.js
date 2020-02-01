import React from 'react';
import {
  Modal, Button, Form
} from 'react-bootstrap';
import 'firebase/auth';
import 'firebase/auth';
import firebase from 'firebase/app';


class DeleteAccountModal extends React.Component {
  state = {
    password: ''
  }

  deleteAccount = (e) => {
    e.preventDefault();
    const { password } = this.state;
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, password);
    user.reauthenticateWithCredential(cred)
    .then(() => user.delete())
    .catch((err) => console.error('error deleting user', err));
  }

  formFieldStringState = (e) => {
    const tempPassword = e.target.value;
    this.setState({ password: tempPassword });
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
            Delete Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.deleteAccount}>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
              name="password"
              type="password"
              placeholder="Current Password"
              onChange={this.formFieldStringState}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" id="closeDeleteModalBtn" onClick={this.props.onHide}>Cancel</Button>
        </Modal.Footer>
    </Modal>
    );
  }
}

export default DeleteAccountModal;
