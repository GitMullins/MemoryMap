import React from 'react';
// import { Button } from 'react-bootstrap';
// import { NavLink as RRNavLink } from 'react-router-dom';
// import EditAccountModal from '../EditAccountModal/EditAccountModal';
// import 'firebase/auth';
// import firebase from 'firebase/app';
// import { Navbar, NavLink } from 'reactstrap';

import NavbarMap from '../NavbarMap/NavbarMap';
import CountryCard from '../CountryCard/CountryCard';
import MarkerData from '../../Helpers/Data/MarkerData';

import './Countries.scss';

class Countries extends React.Component {
  state = {
    countries: [],
    markers: []
  }

  componentDidMount() {
    this.getCountries();
    this.getMarkers();
  }

  getCountries = () => {
    MarkerData.getAllCountriesByUid(this.props.userObj.id)
    .then((results) => this.setState({ countries: results }))
    .catch(err => console.error(err, 'did not get all countries'));
  }

  getMarkers = () => {
    MarkerData.getAllMarkersByUid(this.props.userObj.id)
    .then((results) => this.setState({ markers: results }))
    .catch(err => console.error(err, 'did not get all markers in Countries'));
  }

  render() {
    const { countries } = this.state;
    const {markers } = this.state;

    const countryCards = countries.map((country, i) => (
      <div key={i} className="country-container container-fluid">
        <div className="row country-title">
          <h3>{country}</h3>
        </div>
        <div className="row card country-card">
          {markers.filter(arrayItem => arrayItem.country === country)
          .map((marker) => (
            <CountryCard
            key={marker.id}
            marker={ marker }
            />
          ))}
        </div>
      </div>
    ));
  
      return (
        <div>
          <NavbarMap/>
          { countryCards }
        </div>
      );
    }
  };

export default Countries;