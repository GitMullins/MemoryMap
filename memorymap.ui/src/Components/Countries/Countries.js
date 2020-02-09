import React from 'react';
import { UncontrolledCollapse, Button } from 'reactstrap';

import NavbarMap from '../NavbarMap/NavbarMap';
import CountryCard from '../CountryCard/CountryCard';
import MarkerData from '../../Helpers/Data/MarkerData';
import countriesHeader from '../../Images/countries-header.jpg';

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

  collapseAll = () => {
    const toggleBtns = document.getElementsByClassName('toggle-btn');
    const collapsible = document.getElementsByClassName('country-card');
    for (let i=0; i<toggleBtns.length; i++) {
      if(collapsible[i].classList.contains("show")) {
      toggleBtns[i].click();
      }
    }
  }

  expandAll = () => {
    const toggleBtns = document.getElementsByClassName('toggle-btn');
    const expandible = document.getElementsByClassName('country-card');
    for (let i=0; i<toggleBtns.length; i++) {
      if(!expandible[i].classList.contains("show")) {
      toggleBtns[i].click();
      }
    }  
  }

  render() {
    const { countries } = this.state;
    const {markers } = this.state;

    const countryCards = countries.map((country, i) => (
      <div key={i} className="country-container container-fluid">
        <div className="country-title">
          <Button className="col toggle-btn"
          color="outline-primary"
          id={`toggler-${i}`}
          >{country}
          </Button>
        </div>
        <UncontrolledCollapse className="row card country-card" toggler={`#toggler-${i}`}>
          {markers.filter(arrayItem => arrayItem.country === country)
          .map((marker) => (
            <CountryCard
            key={marker.id}
            marker={ marker }
            />
          ))}
        </UncontrolledCollapse>
      </div>
    ));
  
      return (
        <div className="countries-header-container">
          <NavbarMap/>
            <img className="countries-header-img" alt="world" src={countriesHeader}/>
            <h1 className="countries-header-text">Countries Visited</h1>
            <div className="countries-header-spacer"/>
          {markers.length > 0 &&
            <div className="expand-collapse-btns">
              <Button onClick={this.expandAll}>Expand All</Button>
              <Button onClick={this.collapseAll}>Collapse All</Button>
              { countryCards }
            </div>
          }
        </div>
      );
    }
  };

export default Countries;