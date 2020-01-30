import React from 'react';
import  { Popup } from 'react-leaflet';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import PictureData from '../../Helpers/Data/PictureData';

import './MarkerPopup.scss';

const defaultMarker = {
  image: null,
  country: null,
  date: null,
  description: '',
}

class MarkerPopup extends React.Component {
  state = {
    show: false,
    editedMarker: defaultMarker
  }

  editMarkerBtn = () => {
    this.setState({
      show: !this.state.show
    })
  }

  deleteMarker = () => {
    PictureData.deleteMarkerByMarkerId(this.props.marker.id)
    .then(() => this.props.displayAllMarkers())
    .catch((err) => console.error('could not delete marker', err));
  }

  editMarkerDescription = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const markerId = this.props.marker.id;
    const { editedMarker } = this.state;
    PictureData.editMarkerDescription(markerId, JSON.stringify(editedMarker.description))
    .then(() => this.props.displayAllMarkers())
    .catch((err) => console.error('could not edit description', err));
  }

  fileUploadHandler = (e) => {
    // (e) conditional prevents onChange from firing if user exits file selection w/o selecting file
    if(e) {
      const formData = new FormData();
      const tempMarker = { ...this.state.editedMarker };
      this.setState({ show: false });

      //sends selected image as a 'form' to asp.net
      formData.append('file', e.target.files[0]);
      PictureData.putPicture(this.props.marker.id, formData)
      .then(() => PictureData.getMarkerByMarkerId(this.props.marker.id))
      .then((marker) => { tempMarker.image = marker.image })
      .then(() => this.props.displayAllMarkers())
      .catch((err) => console.error(err, 'could not update pic'))
    }
  };

  descriptionHandler = (e) => {
    const tempMarker = { ...this.state.editedMarker };
    tempMarker.description = e.target.value;
    this.setState({ editedMarker: tempMarker });
  }

  returnImage = () => {
    const { marker } = this.props;
    if(marker.image) {
      return <img className="marker-picture" alt="in country pic" src={`data:image/jpg;base64,${marker.image}`}/>
    }
  }

  returnChooseFileBtn = () => {
    const { show } = this.state;
    
    if(show) return <InputGroup>
                      <FormControl
                      type="file"
                      onChange={this.fileUploadHandler}
                      className="btn btn-light"/>
                    </InputGroup>
  }

  returnDescription = () => {
    const { show } = this.state;
    const { marker } = this.props;
    const { editedMarker } = this.state;

    if(show) return <Form onSubmit={this.editMarkerDescription}>
                      <FormControl
                      type="text"
                      placeholder="Description"
                      value={marker.description?marker.description:editedMarker.description}
                      onChange={this.descriptionHandler}
                      />
                    </Form>
  }

  render() {
    const { marker } = this.props;

    return (
        <Popup
        className="popup-sub">
          { this.returnChooseFileBtn() }
          { this.returnImage() }
          { this.returnDescription() }
          <h5>{marker.description}</h5>
          <p>lat: {marker.latitude} <br/>long: {marker.longitude}</p>
          <Button onClick={this.deleteMarker} className="btn-danger">Delete Marker</Button>
          <Button onClick={this.editMarkerBtn} className="btn-primary">Edit Marker</Button>
        </Popup>
    );
  }
}

export default MarkerPopup;
