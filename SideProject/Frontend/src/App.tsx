import Navigation from "./components/Navigation";
import PrivateRoute from "./routes/PrivateRoute.tsx";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from "./components/Admin/Dashboard";
import Classroom from "./components/Admin/Pages/Classroom.tsx";
import School from "./components/Admin/Pages/School.tsx";


function App() {
  return (
    <>
      <Navigation />
      <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/classroom" element={<PrivateRoute><Classroom /></PrivateRoute>} />
        <Route path="/school" element={<PrivateRoute><School /></PrivateRoute>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;