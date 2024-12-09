import { useState } from 'react'
import Navbar from './Components/Navbar'
import Login from './Components/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './Components/Signup'
import PrivateRoute from './routes/PrivateRoute';
import AdminDashboard from './Components/Admin/AdminDashboard';
import UserHomepage from './Components/User/Dashboard';



function App() {
  const [count, setCount] = useState(0)

  return (
<>
<Navbar />
<Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/admindashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><UserHomepage /></PrivateRoute>} />
      </Routes>
    </Router>
</>
  )
}

export default App