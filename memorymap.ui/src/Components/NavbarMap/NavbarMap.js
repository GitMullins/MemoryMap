import React from 'react';
import { Button } from 'react-bootstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import EditAccountModal from '../EditAccountModal/EditAccountModal';
import 'firebase/auth';
import firebase from 'firebase/app';
import { Navbar, NavLink } from 'reactstrap';

import './NavbarMap.scss';

class NavbarMap extends React.Component {
  state = {
    editAccountModalOpen: false
  }

  returnMarkerBtn = () => {
    if(window.location.pathname === '/home')
    return  <Button
              className={`${this.returnMarkerBtnColor()} add-marker-btn`}
              onClick={this.props.allowMarkerPlacement}>
              {this.returnMarkerBtnValue()}
            </Button>
  }

  returnMarkerBtnValue = () => {
    const { addMarker } = this.props;
    if(addMarker) {
      return 'Cancel'
    } else return 'Add Marker'
  }

  returnMarkerBtnColor = () => {
    const { addMarker } = this.props;
    if(addMarker) {
      return 'btn-danger btn';
    } else return 'btn-primary btn';
  }

  returnMapOrHome = () => {
    if(window.location.pathname === '/home'){
      return <NavLink className="countries-link btn btn-secondary" tag={RRNavLink} to={'/countries'}>Countries</NavLink>
    } else if(window.location.pathname === '/countries'){
      return <NavLink className="countries-link btn btn-secondary" tag={RRNavLink} to={'/home'}>Map</NavLink>
    }
  }

  logOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    let closeEditAccountModal = () => this.setState({ editAccountModalOpen: false });

      return (
      <Navbar fixed="bottom" className="navbar-map container">
        <div className="row"></div>
        <div className="col-6 col-md-4"></div>
        <div className="col-6 col-md-4">
          {this.returnMarkerBtn()}
          </div>
        <div className="navMap-btns-right col-6 col-md-4">
          {this.returnMapOrHome()}
          <Button
          className="btn-secondary"
          onClick={() => this.setState({ editAccountModalOpen: true })}
          >Edit Account
          </Button>
          <EditAccountModal
          userObj={ this.props.userObj }
          show={this.state.editAccountModalOpen}
          onHide={closeEditAccountModal}
          />
          <Button
          className="btn-secondary"
          onClick={this.logOut}
          >LogOut
          </Button>
        </div>
      </Navbar>
      );
  }
}

export default NavbarMap;