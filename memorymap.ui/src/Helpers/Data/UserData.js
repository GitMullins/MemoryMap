import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';

const baseUrl = 'https://localhost:44369/api/user'

// interceptors work by changing the outbound request before the xhr is sent 
// or by changing the response before it's returned to our .then() method.
axios.interceptors.request.use(function (request) {
    const token = sessionStorage.getItem('token');

    if (token != null) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  }, function (err) {
    return Promise.reject(err);
  });

const logInUser = (firebaseUid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/firebaseUid/${firebaseUid}`)
      .then((result) => {
          resolve(result.data)})
      .catch(err => reject(err));
});

const addUser = (newUserObj, firebaseInfo) => new Promise((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(firebaseInfo.email, firebaseInfo.password)
    .then(cred => cred.user.getIdToken())
    .then(token => sessionStorage.setItem('token', token))
    .then(() => newUserObj.firebaseUid = firebase.auth().currentUser.uid)
    .then(() => resolve(axios.post(`${baseUrl}`, newUserObj)))
    .catch(err => reject(err));
});

const editUser = (editedUserObj) => new Promise((resolve, reject) => {
  const firebaseEmail = new Promise (resolve => {
    if(editedUserObj.email) {
      var user = firebase.auth().currentUser;
      var cred = firebase.auth.EmailAuthProvider.credential(user.email, editedUserObj.password);
      user.reauthenticateWithCredential(cred)
      .then(() => resolve(firebase.auth().currentUser.updateEmail(editedUserObj.email)));
    } else reject(console.error('email update error'));
  })
  // const firebasePassword = () => new Promise(resolve => {
  //   if(editedUserObj.password) {
  //   resolve(firebase.auth().currentUser.updatePassword(editedUserObj.password));
  //   } else resolve(null);
  // })

  Promise.all([firebaseEmail])
  .then(() => {
    if(editedUserObj.email) {
    resolve(axios.put(`${baseUrl}/${editedUserObj.id}`, editedUserObj))
    } else resolve(null)})
  .catch(err => reject(err));
});

export default {
    addUser,
    logInUser,
    editUser
};
