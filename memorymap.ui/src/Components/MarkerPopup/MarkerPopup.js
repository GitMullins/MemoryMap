import React from 'react';
import  { Popup } from 'react-leaflet';
import { Button } from 'react-bootstrap';



class MarkerPopup extends React.Component {

  render() {
    const { marker } = this.props;
    return (
        <Popup>
            <Button>Upload Picture</Button>
            <p>lat: {marker[0]} <br/>long: {marker[1]}</p>
        </Popup>
    );
  }
}

export default MarkerPopup;
