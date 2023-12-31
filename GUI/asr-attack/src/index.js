import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //Connects html to React components
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
