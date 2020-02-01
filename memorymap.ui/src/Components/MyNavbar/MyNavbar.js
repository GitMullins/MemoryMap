import React from 'react';
import { Button } from 'react-bootstrap';
import EditAccountModal from '../EditAccountModal/EditAccountModal';
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

class MyNavbar extends React.Component {
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
      </Navbar>
      );
  }
}

export default MyNavbar;