import React from 'react';
import  { Popup } from 'react-leaflet';
import { Button } from 'react-bootstrap';



class MarkerPopup extends React.Component {

  render() {
    const { marker } = this.props;
    return (
        <Popup>
            <Button>Upload Picture</Button>
            <p>lat: {marker.latitude} <br/>long: {marker.longitude}</p>
        </Popup>
    );
  }
}

export default MarkerPopup;
