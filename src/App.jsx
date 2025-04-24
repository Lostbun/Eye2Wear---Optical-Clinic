import './index.css'
import PatientRegistration from './PatientRegistration'
import UserLogin  from './UserLogin'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PatientLandingpage from './PatientLandingpage'
import PatientInformation from './PatientInformation'
import AdminDashboard from './AdminDashboard'

function App() {


  return (


        <BrowserRouter>
          <Routes>
            <Route path='/patientregistration' element={<PatientRegistration/>}> </Route>
            <Route path='/userlogin' element={<UserLogin/>}> </Route>
            <Route path='/patientlandingpage' element={<PatientLandingpage/>}></Route>
            <Route path='/patientinformation' element={<PatientInformation/>}></Route>
            <Route path='/admindashboard' element={<AdminDashboard/>}></Route>
          </Routes>
        </BrowserRouter>

  )
}

export default App
