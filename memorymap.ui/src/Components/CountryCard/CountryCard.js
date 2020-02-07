import React from 'react';
import needPics from '../../Images/need-pics.jpg';

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
            {marker.image?<img className="country-picture" alt="in country" src={`data:image/jpg;base64,${marker.image}`}/>:<img className="country-picture need-pics" alt="in country" src={needPics}/>}
            <p className="country-description">{marker.description}</p>
          </div>
        // </div>
      // </div>
    );
  }
}

export default CountryCard;
