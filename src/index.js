import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Authfb from './components/Authfb';


ReactDOM.render(
  <React.StrictMode>
     <Authfb />,
     <App />,
     
  </React.StrictMode>,
  document.getElementById('root'),
);