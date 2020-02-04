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
      // <div className="DriveCard col-3">
        // <div className="drive-card card">
          <div className="col-lg-2 card-details">
            {/* <h5 className="card-title">{marker.country}</h5> */}
            <img className="country-picture" alt="in country" src={`data:image/jpg;base64,${marker.image}`}/>
            <p className="country-description">{marker.description}</p>
          </div>
        // </div>
      // </div>
    );
  }
}

export default CountryCard;
