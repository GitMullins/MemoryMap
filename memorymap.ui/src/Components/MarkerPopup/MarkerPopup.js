import React from 'react';
import  { Popup } from 'react-leaflet';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import MarkerData from '../../Helpers/Data/MarkerData';

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
    MarkerData.deleteMarkerByMarkerId(this.props.marker.id)
    .then(() => this.props.displayAllMarkers())
    .catch((err) => console.error('could not delete marker', err));
  }

  deletePicture = () => {
    MarkerData.deletePictureByMarkerId(this.props.marker.id)
    .then(() => this.props.displayAllMarkers())
    .catch((err) => console.error('could not delete picture', err));
  }

  editMarkerDescription = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({show: !this.state.show});
    const markerId = this.props.marker.id;
    const { editedMarker } = this.state;
    MarkerData.editMarkerDescription(markerId, JSON.stringify(editedMarker.description))
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
      MarkerData.putPicture(this.props.marker.id, formData)
      .then(() => MarkerData.getMarkerByMarkerId(this.props.marker.id))
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
      return <div className="marker-picture-container" style={{ position: "relative", display: "flex" }} >
        <img className="marker-picture" alt="in country pic" src={`data:image/jpg;base64,${marker.image}`}/>
        {this.state.show?<Button className="delete-picture-btn btn-danger" onClick={this.deletePicture}>x</Button>:null}
        </div>
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

  returnDescriptionValue = () => {
    const { marker } = this.props;
    const { editedMarker } = this.state;

    if(editedMarker.description) return editedMarker.description;
    else if(marker.description === null) return '';
    else if(marker.description) return marker.description;
  }

  returnDescription = () => {
    const { show } = this.state;
    const { marker } = this.props;

    if(show) return <Form onSubmit={this.editMarkerDescription}>
                      <FormControl
                      type="text"
                      placeholder="Description"
                      value={this.returnDescriptionValue()}
                      onChange={this.descriptionHandler}
                      />
                    </Form>
    else if(show!==true) return <h5>{marker.description}</h5>
  }

  mouseOver = () => {
    const map = document.getElementsByClassName("leaflet-layer");
    if(map) map[0].style.filter = "brightness(50%)";
  }

  mouseLeave = () => {
    const map = document.getElementsByClassName("leaflet-layer");
    if(map) map[0].style.filter = "brightness(100%)";
  }

  render() {
    const { marker } = this.props;

    return (
      <div className="popup-container"
      onMouseOver={this.mouseOver}
      onMouseLeave={this.mouseLeave}  
      >
        <Popup
        className="popup-sub container">
          { this.returnChooseFileBtn() }
          { this.returnImage() }
          <div className="empty-marker-container"
          style={marker.image?null:{ display: "block" }}
          >
            { this.returnDescription() }
            <div className="row location-container">
              <h2 className="col country-text">{marker.country}</h2>
            </div>
            <div className="hidden-card">
              <div className="row">
              <h5 className="col latlng-txt"><br/><i>lat: {marker.latitude} <br/>long: {marker.longitude}</i></h5>
              </div>
              <div className="col edit-delete-btns">
              <button onClick={this.deleteMarker} className="btn btn-outline-danger marker-btns row">Delete Marker</button>
              <button onClick={this.editMarkerBtn} className="btn btn-outline-info marker-btns row">Edit Marker</button>
            </div>
          </div>
          </div>
        </Popup>
        </div>
    );
  }
}

export default MarkerPopup;
