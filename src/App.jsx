import './index.css'
import PatientRegistration from './PatientRegistration'
import UserLogin  from './UserLogin'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PatientLandingpage from './PatientLandingpage'
import PatientInformation from './PatientInformation'
import AdminDashboard from './AdminDashboard'
import ResetPassword from './ResetPassword'
import PatientDashboard from './PatientDashboard'
import PatientProducts from './PatientProducts'
import PatientWishlist from './PatientWishlist'
import PatientOrders from './PatientOrders'

function App() {


  return (


        <BrowserRouter>
          <Routes>
            <Route path='/patientregistration' element={<PatientRegistration/>}> </Route>
            <Route path='/userlogin' element={<UserLogin/>}> </Route>
            <Route path='/patientlandingpage' element={<PatientLandingpage/>}></Route>
            <Route path='/patientinformation' element={<PatientInformation/>}></Route>
            <Route path='/admindashboard' element={<AdminDashboard/>}></Route>
            <Route path="/reset-password/:id/:token" element={<ResetPassword/>}/>
            <Route path='/patientdashboard' element={<PatientDashboard/>}></Route>
            <Route path='/patientproducts' element={<PatientProducts/>}></Route>
            <Route path='/patientwishlist' element={<PatientWishlist/>}></Route>
            <Route path='/patientorders' element={<PatientOrders/>}></Route>
          </Routes>
        </BrowserRouter>

  )
}

export default App
