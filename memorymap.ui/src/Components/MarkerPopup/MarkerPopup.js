import React from 'react';
import  { Popup } from 'react-leaflet';
import { FormControl, InputGroup } from 'react-bootstrap';
import PictureData from '../../Helpers/Data/PictureData';

import './MarkerPopup.scss';



class MarkerPopup extends React.Component {
  state = {
    refresh: false
  }
//  fileUploadHandler = (e) => {
//     const { marker } = this.props;
//     const pictureUrl = e.target.files[0].name;
//     this.setState({
//       fileSelected: pictureUrl
//     })
//       // PictureData.putPicture(marker.id, picture.stringOfBase64);
//       // console.error(pictureUrl);
//     // }))
//     // .then(() => this.props.displayAllMarkers())
//     // .catch((err) => console.error('could not upload picture', err));
//   }

  fileUploadHandler = (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    PictureData.putPicture(this.props.marker.id, formData)
    .then(() => this.setState({ refresh: true }))
    .then(() => this.setState({ refresh: false }))
  };

  returnImageOrButton = () => {
    const { marker } = this.props;
    if(marker.image) {
      return <img className="marker-picture" alt="in country pic" src={`data:image/jpg;base64,${marker.image}`}/>
    } else {
      return  <InputGroup>
                <FormControl
                type="file"
                onChange={this.fileUploadHandler}/>
              </InputGroup>
    }
  }

  render() {
    const { marker } = this.props;
    const { refresh } = this.state;

    return (
        <Popup className="popup-sub" refresh={refresh}>
          { this.returnImageOrButton() }
          <h5>{marker.description}</h5>
          <p>lat: {marker.latitude} <br/>long: {marker.longitude}</p>
        </Popup>
    );
  }
}

export default MarkerPopup;
