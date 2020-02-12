import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = 'https://localhost:44369/api/picture'


const putPicture = (markerId, form) => new Promise((resolve, reject) => {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  
  axios.put(`${baseUrl}/putPicture/${markerId}`, form, config)
      .then((result) => {
          resolve(result.data)})
      .catch(err => reject(err));
});

const getAllMarkersByUid = uid => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/allMarkers/${uid}`)
        .then(result => resolve(result.data))
        .catch(err => reject(err));
});

const getAllCountriesByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/allCountries/${uid}`)
      .then(result => resolve(result.data))
      .catch(err => reject(err));
});

const addMarker = newMarkerObj => new Promise((resolve, reject) => {
  const geocodeApi = apiKeys.googleReverseGeocodeKey.apiKey;
  const api = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newMarkerObj.latitude},${newMarkerObj.longitude}&result_type=country&key=${geocodeApi}`
  fetch(api).then((res) => res.json())
  .then((jsonObj) => {
    if(jsonObj.results.length > 0) {
      newMarkerObj.country = jsonObj.results[0].formatted_address
    }
  })

  .then(() => axios.post(`${baseUrl}/newMarker`, newMarkerObj))
  .then(result => resolve(result.data))
  .catch(err => reject(err));
});

const getMarkerByMarkerId = markerId => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/${markerId}`)
  .then(result => resolve(result.data))
  .catch(err => reject(err));
})

const deleteMarkerByMarkerId = markerId => new Promise((resolve, reject) => {
  axios.delete(`${baseUrl}/marker/${markerId}`)
  .then(result => resolve(result.data))
  .catch(err => reject(err));
})

const deletePictureByMarkerId = markerId => new Promise((resolve, reject) => {
  axios.put(`${baseUrl}/deletePicture/${markerId}`)
  .then(result => resolve(result.data))
  .catch(err => reject(err));
})


const editMarkerDescription = (markerId, marker) => new Promise((resolve, reject) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  axios.put(`${baseUrl}/editDescription/${markerId}`, marker, config)
      .then((result) => resolve(result.data))
      .catch(err => reject(err));
});


export default {
    addMarker,
    getAllMarkersByUid,
    putPicture,
    getMarkerByMarkerId,
    deleteMarkerByMarkerId,
    editMarkerDescription,
    getAllCountriesByUid,
    deletePictureByMarkerId
};
