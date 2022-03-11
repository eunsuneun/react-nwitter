import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import firebasee from './firebase';
console.log(firebasee);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
