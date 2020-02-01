import React from 'react';
import { Button } from 'react-bootstrap';
import EditAccountModal from '../EditAccountModal/EditAccountModal';
import 'firebase/auth';
import firebase from 'firebase/app';
import {
  // Collapse,
  Navbar,
  // NavbarToggler,
  // NavbarBrand,
  // Nav,
  // NavLink,
  // UncontrolledDropdown,
  // DropdownMenu,
  // DropdownToggle,
  // DropdownItem,
  // Modal,
  // ModalHeader,
} from 'reactstrap';

class NavbarMap extends React.Component {
  state = {
    editAccountModalOpen: false
  }

  returnButtonValue = () => {
    const { addMarker } = this.props;
    if(addMarker) {
      return 'Cancel'
    } else return 'Add Marker'
  }

  returnButtonColor = () => {
    const { addMarker } = this.props;
    if(addMarker) {
      return 'btn-danger btn'
    } else return 'btn-primary btn'
  }

  logOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    let closeEditAccountModal = () => this.setState({ editAccountModalOpen: false })

      return (
      <Navbar fixed="bottom" className="navbar-map">
        <Button
          className={`${this.returnButtonColor()} add-marker-btn`}
          onClick={this.props.allowMarkerPlacement}
        >
          {this.returnButtonValue()}
        </Button>
        <Button
        onClick={() => this.setState({ editAccountModalOpen: true })}
        >Edit Account
        </Button>
        <EditAccountModal
        userObj={ this.props.userObj }
        show={this.state.editAccountModalOpen}
        onHide={closeEditAccountModal}
        />
        <Button onClick={this.logOut}>LogOut</Button>
      </Navbar>
      );
  }
}

export default NavbarMap;