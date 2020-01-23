import React from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker } from 'react-leaflet';
import MarkerPopup from '../MarkerPopup/MarkerPopup';
import PictureData from '../../Helpers/Data/PictureData';

import './Home.scss';

const myIcon = L.icon({
  iconUrl: '../cameraMarker.png',
  iconSize: [25, 41],
  // iconAnchor: [22, 94],
  popupAnchor: [-10, -90],
});

const defaultMarker = {
  id: '',
  userId: '',
  image: '',
  country: null,
  date: null,
  description: '',
  longitude: '',
  latitude: ''
}

class Home extends React.Component {
  state = {
    zoom: 3,
    addMarker: false,
    newMarker: defaultMarker,
    allMarkers: []
  }

  componentDidMount() {
    this.displayAllMarkers();
  }

  displayAllMarkers() {
    const { id } = this.props.userObj;
    PictureData.getAllMarkersByUid(id)
    .then((results) => this.setState({ allMarkers: results }))
    .catch((err) => console.error('did not get all markers', err));
  }

  addMarkerOnMap = (e)=> {
    if(this.state.addMarker === true) {
      const tempMarker = { ...this.state.newMarker };
      tempMarker.latitude = e.latlng.lat;
      tempMarker.longitude = e.latlng.lng;
      tempMarker.userId = this.props.userObj.id;
      this.setState({addMarker: false});
      PictureData.addMarker(tempMarker)
      .then(() => this.displayAllMarkers())
    }
  }

  allowMarkerPlacement = () => {
    this.setState({ addMarker: true });
  }

  render() {
    const { allMarkers } = this.state;

    const makeMarkers = allMarkers.map(marker => (
      <Marker
      icon={myIcon}
      position={[marker.latitude, marker.longitude]}
      key={marker.id}
      marker={marker}
      >
        <MarkerPopup className="popup"
        marker={marker}
        />
      </Marker>
    ));

  //   function hexToBase64(str) {
  //     return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
  // }

  // const getImage = allMarkers[0].image.src = 'data:image/jpeg;base64,' + hexToBase64(binaryData);

    return (
      <div>>
      <Map className="map"
      center={[47.5162, 14.5501]}
      zoom={this.state.zoom}
      onClick={this.addMarkerOnMap}
      >
        <TileLayer 
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors, Tiles style by <a href=&quot;https://www.hotosm.org/&quot; target=&quot;_blank&quot;>Humanitarian OpenStreetMap Team</a> hosted by <a href=&quot;https://openstreetmap.fr/&quot; target=&quot;_blank&quot;>OpenStreetMap France</a>"
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        { makeMarkers }
      </Map>
      <button onClick={this.allowMarkerPlacement}>
      Add Marker
      </button>
      {/* {getImage} */}
      </div>
    );
  }
}

export default Home;