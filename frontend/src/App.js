import './index.css'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { Flip, ToastContainer } from 'react-toastify'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/home/home'
import Booking from './components/booking/booking'
import Checkout from './components/admin/kitchen/checkout'
import NavBar from './components/customer/header/Navbar'
import Services from './components/customer/services/Services'
import Registration from './components/registration/registration'
import TourDetails from './components/tourRequest/TourDetails'
import Login from './components/login/Login'
import QuestionValidation from './components/login/QuestionValidation'
import CaesarCipherValidation from './components/login/CaesarCipherValidation'
import Feedbacks from './components/registration/feedback'
import Visualizations from './components/visualizations/Visualizations'

function App() {
  return (
    <>
      <ToastContainer
        icon={false}
        transition={Flip}
        toastStyle={{ backgroundColor: '#8C522A', color: '#fff' }}
      />
      <Router>
        <NavBar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/services' element={<Services />} />
          <Route path='/question-validate' element={<QuestionValidation />} />
          <Route
            path='/caesarcipher-validate'
            element={<CaesarCipherValidation />}
          />
          <Route path='/booking' element={<Booking />} />
          <Route path='/home' element={<Home />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/services' element={<Services />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/' element={<Home />} />
          <Route path='/tourDetails' element={<TourDetails />} />
          <Route path='/visualizations' element={<Visualizations />} />
          <Route path='/feedback' element={<Feedbacks />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
