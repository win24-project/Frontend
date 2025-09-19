import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Register from './pages/Register';
import GymClasses from './pages/GymClasses';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/klasser' element={<GymClasses/>}/>
    </Routes>
  )
}

export default App
