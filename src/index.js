import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import drinks from './drinks';

ReactDOM.render(
  <React.StrictMode>
    <header>
      <h1>SensorTech</h1>
    </header>
    <App drinks={drinks}/>
  </React.StrictMode>,
  document.getElementById('root')
);
