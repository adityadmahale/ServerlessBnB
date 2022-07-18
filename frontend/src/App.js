import "./App.css";
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Navbar from "./components/customer/header/Navbar";
import Services from "./components/customer/services/Services";
import Login from './components/login/Login';
import QuestionValidation from './components/login/QuestionValidation';
import CaesarCipherValidation from './components/login/CaesarCipherValidation';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Services />} />
          <Route path="/question-validate" element={<QuestionValidation />} />
          <Route path="/caesarcipher-validate" element={<CaesarCipherValidation />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
