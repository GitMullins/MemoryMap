import React from 'react';
import {
  Modal, Button, Form
} from 'react-bootstrap';
import 'firebase/auth';
import UserData from '../../Helpers/Data/UserData';
import 'firebase/auth';
import firebase from 'firebase/app';
import DeleteAccountModal from '../DeleteAccountModal/DeleteAccountModal';


const defaultUser = {
  id: '',
  email: '',
  password: '',
  newPassword: '',
  firebaseUid: ''
};

class EditAccountModal extends React.Component {
  state = {
    deleteAccountModalOpen: false,
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
    tempUser[e.target.name] = e.target.value;
    this.setState({ editedUser: tempUser });
  }

  render() {
    const { userObj, ...rest } = this.props;
    let closeDeleteAccountModal = () => this.setState({ deleteAccountModalOpen: false })
  
    return (

      <Modal
      {...rest}
      size="md"
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
              <Form.Label>Current Email: {firebase.auth().currentUser.email}</Form.Label>
              <Form.Control
              name="email"
              type="email"
              placeholder="Enter new email"
              onChange={this.formFieldStringState}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
              name="password"
              type="password"
              placeholder="Current Password"
              onChange={this.formFieldStringState}
              />
            </Form.Group>

            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
              name="newPassword"
              type="password"
              placeholder="New Password"
              onChange={this.formFieldStringState}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
          variant="danger"
          id="closeDeleteModalBtn"
          onClick={() => this.setState({ deleteAccountModalOpen: true })}
          >DELETE ACCOUNT
          </Button>
          <Button variant="danger" id="closeModalBtn" onClick={this.props.onHide}>Cancel</Button>
        </Modal.Footer>
        <DeleteAccountModal
        show={this.state.deleteAccountModalOpen}
        onHide={closeDeleteAccountModal}
        >
        </DeleteAccountModal>
    </Modal>
    );
  }
}

export default EditAccountModal;
