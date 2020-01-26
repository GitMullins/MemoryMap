import axios from 'axios';

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

const addMarker = newMarkerObj => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/newMarker`, newMarkerObj)
      .then(result => resolve(result.data))
      .catch(err => reject(err));
});

const getMarkerByMarkerId = markerId => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/${markerId}`)
  .then(result => resolve(result.data))
  .catch(err => reject(err));
})

export default {
    addMarker,
    getAllMarkersByUid,
    putPicture,
    getMarkerByMarkerId
};
