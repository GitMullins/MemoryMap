import React from 'react';

class CountryCard extends React.Component {
  // deleteMe = (e) => {
  //   e.preventDefault();
  //   const { trip, deleteTrip } = this.props;
  //   deleteTrip(trip.id, trip.routeId);
  // }

  render() {
    const { marker } = this.props;
    return (
      <div className="DriveCard col-3">
        <div className="drive-card card">
          <div className="card-body">
            <h5 className="card-title">{marker.country}</h5>
            <img className="countries-image" src={`data:image/jpg;base64,${marker.image}`}/>
            <p>{marker.description}</p>
          </div>
        </div>
        WAT
      </div>
    );
  }
}

export default CountryCard;
