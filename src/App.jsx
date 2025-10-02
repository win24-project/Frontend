import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import GymClasses from './pages/GymClasses';
import SelectMembership from './pages/SelectMembership';
import ConfirmEmail from './pages/ConfirmEmail';
import ResendConfirmationEmail from './pages/ResendConfirmationEmail';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SubscriptionSuccessPage from './pages/SubscriptionSuccessPage';
import HasInitPayment from './guards/HasInitPayment'


function App() {
  return (
    <Routes>
      <Route element={<HasInitPayment/>}>
        <Route path='/classes' element={<GymClasses/>}/>
        <Route path='/' element={<Home/>} />
      </Route>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/membership' element={<SelectMembership />}/>
      <Route path='/confirm-email' element={<ConfirmEmail />}/>
      <Route path='/resend-email-confirmation' element={<ResendConfirmationEmail />}/>
      <Route path='/reset-password' element={<ResetPasswordPage />}/>
      <Route path='/forgot-password' element={<ForgotPasswordPage />}/>
      <Route path='/success' element={<SubscriptionSuccessPage/>}/>

    </Routes>
  );
}

export default App
