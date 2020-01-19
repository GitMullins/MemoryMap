import React from 'react';
import Auth from '../Auth/Auth';
import './App.scss';

import fbConnect from '../../Helpers/Data/fbConnection';

fbConnect();

function App() {
  return (
    <div className="App">
      <Auth />
  </div>
);
}

export default App;
