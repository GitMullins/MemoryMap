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
  date: '',
  description: '',
  longitude: '',
  latitude: ''
}

class Home extends React.Component {
  state = {
    zoom: 3,
    addMarker: false,
    newMarker: defaultMarker
  }

  addMarkerOnMap = (e)=> {
    // const {markers} = this.state;
    // if(this.state.addMarker === true) {
    //   markers.push(e.latlng);
    //   this.setState({markers});
    //   this.setState({addMarker: false});
    //   console.error(markers);
    const {newMarker} = this.state;
    if(this.state.addMarker === true) {
      const tempMarker = { ...this.state.newMarker };
      tempMarker.latitude = e.latlng.lat;
      tempMarker.longitude = e.latlng.lng;
      tempMarker.userId = this.props.userObj.id;
      PictureData.addMarker(tempMarker);
    }
  }

  allowMarkerPlacement = () => {
    this.setState({ addMarker: true });
  }

  render() {
    const { markers } = this.state;

    // const makeMarkers = this.state.markers.map(marker => (
    //   <Marker
    //   icon={myIcon}
    //   // position={[marker[0], marker[1]]}
    //   key={marker.id}
    //   marker={marker}
    //   >
    //     <MarkerPopup
    //     marker={marker}
    //     />
    //   </Marker>
    // ));

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
        {/* { makeMarkers } */}
      </Map>
      <button onClick={this.allowMarkerPlacement}>
      Add Marker
      </button>
      </div>
    );
  }
}

export default Home;