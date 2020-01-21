import React from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker } from 'react-leaflet';
import MarkerPopup from '../MarkerPopup/MarkerPopup';

import './Home.scss';

var myIcon = L.icon({
  iconUrl: '../cameraMarker.png',
  iconSize: [25, 41],
  // iconAnchor: [22, 94],
  popupAnchor: [-10, -90],
});

class Home extends React.Component {
  state = {
    zoom: 3,
    addMarker: false,
    markers: [[51.505, -0.09], [36.174465, -86.7816]]
  }

  addMarkerOnMap = (e)=> {
    const {markers} = this.state;
    if(this.state.addMarker === true) {
      markers.push(e.latlng);
      this.setState({markers});
      this.setState({addMarker: false});
      console.error(markers);
    }
  }

  allowMarkerPlacement = () => {
    this.setState({ addMarker: true });
  }

  render() {
    const { markers } = this.state;
    const currentPosition = [markers[0][0], markers[0][1]];

    const makeMarkers = this.state.markers.map(marker => (
      <Marker
      icon={myIcon}
      position={[marker[0], marker[1]]}
      key={marker.id}
      marker={marker}
      >
        <MarkerPopup
        marker={marker}
        />
      </Marker>
    ));

    return (
      <div>>
      <Map className="map"
      center={currentPosition}
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
      </div>
    );
  }
}

export default Home;