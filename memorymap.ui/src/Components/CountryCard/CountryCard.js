import React from 'react';
import needPics from '../../Images/need-pics.jpg';

class CountryCard extends React.Component {

  render() {
    const { marker } = this.props;
    return (
          <div className="col-lg-2 card-details">
            {marker.image?<img className="country-picture" alt="in country" src={`data:image/jpg;base64,${marker.image}`}/>:<img className="country-picture need-pics" alt="in country" src={needPics}/>}
            <p className="country-description">{marker.description}</p>
          </div>
    );
  }
}

export default CountryCard;
