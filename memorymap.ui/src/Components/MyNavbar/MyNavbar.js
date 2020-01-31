import React from 'react';
import { Button } from 'react-bootstrap';
// import { NavLink as RRNavLink, Link } from 'react-router-dom';
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

      return (
      <Navbar fixed="bottom" className="navbar-map">
        <Button
          className={`${this.returnButtonColor()} add-marker-btn`}
          onClick={this.props.allowMarkerPlacement}
        >
          {this.returnButtonValue()}
        </Button>
      </Navbar>
      );
  }
}

export default MyNavbar;