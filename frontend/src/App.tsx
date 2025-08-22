import { Routes, Route } from 'react-router-dom'

// routes
import Landing from './landing/landing'
import Login from './app/auth/login'
import Signup from './app/auth/signup'
import Recorder from './app/mainFeature/Recorder'

// layout
import { SidebarProvider } from './components/SidebarContext'
import NotFound from './app/NotFound'

function App() {
  return (
    <SidebarProvider>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/recorder" element={<Recorder />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
    </SidebarProvider>
  )
}

export default App
