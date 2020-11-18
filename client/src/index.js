import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import Menu from './components/Menu';
import {Background, Midground,} from './components/Background'
import reportWebVitals from './reportWebVitals';
import Timeline from './Timeline';

ReactDOM.render(
  <React.StrictMode>
<<<<<<< HEAD
  <Background />
  <Midground />
  <Menu />
  <Timeline />
    {/* <App /> */}
=======
  <App /> 
>>>>>>> 4e5450f017e472e628c9627ec3f48784c02d2155
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
