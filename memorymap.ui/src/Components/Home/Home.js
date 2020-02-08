import React from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker } from 'react-leaflet';
import MarkerPopup from '../MarkerPopup/MarkerPopup';
import MarkerData from '../../Helpers/Data/MarkerData';
import NavbarMap from '../NavbarMap/NavbarMap';

import './Home.scss';
import 'leaflet/dist/leaflet.css';

const myIcon = L.icon({
  iconSize: [25, 41],
  // iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png'
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

  displayAllMarkers = () => {
    MarkerData.getAllMarkersByUid(this.props.userObj.id)
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
      MarkerData.addMarker(tempMarker)
      .then(() => this.displayAllMarkers(this.props.userObj.id))
    }
  }

  cursorDisplay = () => {
    const cursor = document.getElementById('cursor');
    if(cursor) {
    if(this.state.addMarker) {
      cursor.display = "";
      document.addEventListener('mousemove', e => {
          cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;");
      })
    } else if(!this.state.addMarker) {
        document.addEventListener('mousemove', () => {
        cursor.style.display = "none";
        })
      }
    }
  }

  allowMarkerPlacement = () => {
    this.setState({ addMarker: !this.state.addMarker });
  }

  render() {
    const { userObj } = this.props;
    const { allMarkers } = this.state;
    const { addMarker } =this.state;

    const makeMarkers = allMarkers.map(marker => (
      <Marker
      icon={myIcon}
      position={[marker.latitude, marker.longitude]}
      key={marker.id}
      marker={marker}
      putPicture={this.putPicture}
      displayAllMarkers={this.displayAllMarkers}
      userObj={userObj}
      >
        <MarkerPopup
        putPicture={this.putPicture}
        displayAllMarkers={this.displayAllMarkers}
        userObj={userObj}
        className="marker-popup"
        marker={marker}
        />
      </Marker>
    ));
    
    return (
      <div className="map-navbar-container">
        <div id="cursor"/>
        <Map
        style={ addMarker?{cursor:'pointer'} : null }
        className="map"
        center={[47.5162, 14.5501]}
        zoom={this.state.zoom}
        onClick={this.addMarkerOnMap}
        >
            {this.cursorDisplay()}
          <TileLayer 
          attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors, Tiles style by <a href=&quot;https://www.hotosm.org/&quot; target=&quot;_blank&quot;>Humanitarian OpenStreetMap Team</a> hosted by <a href=&quot;https://openstreetmap.fr/&quot; target=&quot;_blank&quot;>OpenStreetMap France</a>"
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          { makeMarkers }
        </Map>
        <NavbarMap
        userObj={ userObj }
        allowMarkerPlacement={this.allowMarkerPlacement}
        addMarker={addMarker}
        />
      </div>
    );
  }
}

export default Home;