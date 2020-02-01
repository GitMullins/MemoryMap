import React from 'react';
import {
  Modal, Button, Form
} from 'react-bootstrap';
import 'firebase/auth';
import UserData from '../../Helpers/Data/UserData';
import 'firebase/auth';
import firebase from 'firebase/app';


const defaultUser = {
  id: '',
  email: '',
  password: '',
  firebaseUid: ''
};

class EditAccountModal extends React.Component {
  state = {
    editedUser: defaultUser,
  }

  editAccount = (e) => {
    e.preventDefault();
    document.getElementById('closeModalBtn').click();
    const { editedUser } = this.state;
    editedUser.id = this.props.userObj.id;
    UserData.editUser(editedUser)
  }

  formFieldStringState = (e) => {
    const tempUser = { ...this.state.editedUser };
    tempUser[e.target.type] = e.target.value;
    this.setState({ editedUser: tempUser });
  }

  returnEmailValue = () => {
    const { editedUser } = this.state;
    if(editedUser.email === '') {
      return firebase.auth().currentUser.email
    } else return editedUser.email;
  }

  render() {
    const { userObj, ...rest } = this.props;
  
    return (

      <Modal
      {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.editAccount}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={this.formFieldStringState}
              value={this.returnEmailValue()}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
              type="password"
              placeholder="Password"
              onChange={this.formFieldStringState}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" id="closeModalBtn" onClick={this.props.onHide}>Cancel</Button>
        </Modal.Footer>
    </Modal>
    );
  }
}

export default EditAccountModal;
