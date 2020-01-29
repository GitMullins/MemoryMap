import React from 'react';
import  { Popup } from 'react-leaflet';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import PictureData from '../../Helpers/Data/PictureData';

import './MarkerPopup.scss';

class MarkerPopup extends React.Component {
  state = {
    editedMarker: {
      image: null,
      country: null,
      date: null,
      description: null
    }
  }

  deleteMarker = () => {
    PictureData.deleteMarkerByMarkerId(this.props.marker.id)
    .then(() => this.props.displayAllMarkers())
    .catch((err)=> console.error('could not delete marker', err));
  }

  fileUploadHandler = (e) => {
    // (e) conditional prevents onChange from firing if user exits file selection w/o selecting file
    if(e) {
      const formData = new FormData();
      const tempMarker = { ...this.state.editedMarker };

      //sends selected image as a 'form' to asp.net
      formData.append('file', e.target.files[0]);
      PictureData.putPicture(this.props.marker.id, formData)
      .then(() => PictureData.getMarkerByMarkerId(this.props.marker.id))
      .then((marker) => { tempMarker.image = marker.image })
      .then(() => this.props.displayAllMarkers())
      .catch((err) => console.error(err, 'could not update pic'))
    }
  };

  returnImageOrButton = () => {
    const { marker } = this.props;
    const { editedMarker } = this.state;

    if(marker.image) {
      return  <div>
                <img className="marker-picture" alt="in country pic" src={`data:image/jpg;base64,${marker.image}`}/>
                <InputGroup>
                  <FormControl
                  type="file"
                  onChange={this.fileUploadHandler}
                  className="btn btn-light"/>
                </InputGroup>
              </div>
    } else if(editedMarker.image) {
      return <div>
                <img className="marker-picture" alt="in country pic" src={`data:image/jpg;base64,${editedMarker.image}`}/>
                <InputGroup>
                    <FormControl
                    type="file"
                    onChange={this.fileUploadHandler}
                    className="btn btn-light"/>
                  </InputGroup>
              </div>
    } else {
      return  <InputGroup>
                <FormControl
                type="file"
                onChange={this.fileUploadHandler}
                className="btn btn-light"/>
              </InputGroup>;
    }
  }

  render() {
    const { marker } = this.props;
    return (
        <Popup
        className="popup-sub">
          { this.returnImageOrButton() }
          <h5>{marker.description}</h5>
          <p>lat: {marker.latitude} <br/>long: {marker.longitude}</p>
          <Button onClick={this.deleteMarker} className="btn-danger">Delete Marker</Button>
        </Popup>
    );
  }
}

export default MarkerPopup;
