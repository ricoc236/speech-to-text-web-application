import { Routes, Route } from 'react-router-dom';

//routes
import Landing from './landing/landing'
import Login from './app/auth/login' 
import Signup from './app/auth/signup' 


function App() {
  return (
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>

  )
}

export default App
