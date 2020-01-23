import React from 'react';
import  { Popup } from 'react-leaflet';
import { Button } from 'react-bootstrap';

import './MarkerPopup.scss';



class MarkerPopup extends React.Component {

  render() {
    const { marker } = this.props;
    return (
        <Popup className="popup-sub">
          <img className="marker-picture" src={`data:image/png;base64,${marker.image}`}/>
          <Button>Upload Picture</Button>
          <p>lat: {marker.latitude} <br/>long: {marker.longitude}</p>
        </Popup>
    );
  }
}

export default MarkerPopup;
