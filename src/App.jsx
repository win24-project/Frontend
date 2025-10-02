import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import GymClasses from './pages/GymClasses';
import SelectMembership from './pages/SelectMembership';
import ConfirmEmail from './pages/ConfirmEmail';
import ResendConfirmationEmail from './pages/ResendConfirmationEmail';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/classes' element={<GymClasses/>}/>
      <Route path='/membership' element={<SelectMembership />}/>
      <Route path='/confirm-email' element={<ConfirmEmail />}/>
      <Route path='/resend-email-confirmation' element={<ResendConfirmationEmail />}/>
    </Routes>
  );
}

export default App
