import axios from 'axios';

const baseUrl = 'https://localhost:44369/api/picture'


// const getPicture = (firebaseUid) => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/firebaseUid/${firebaseUid}`)
//       .then((result) => {
//           resolve(result.data)})
//       .catch(err => reject(err));
// });

// const getUserById = uid => new Promise((resolve, reject) => {
//     axios.get(`${baseUrl}/${uid}`)
//         .then(result => resolve(result.data))
//         .catch(err => reject(err));
// });

const addMarker = newMarkerObj => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/newMarker`, newMarkerObj)
      .then(result => resolve(result.data))
      .catch(err => reject(err))
});

export default {
    addMarker,
};
