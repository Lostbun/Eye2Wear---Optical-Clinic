import { StrictMode } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import PatientLandingpage from './PatientLandingpage.jsx'
import PatientRegistration from './PatientRegistration.jsx'
import PatientInformation from './PatientInformation.jsx'
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>,
)
