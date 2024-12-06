import Signup from "./Components/User/Signup.jsx";
import PrivateRoute from "./routes/PrivateRoute";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from "./Components/User/Login.jsx";
import SeminarDashboard from "./Components/Seminars/Seminars.jsx";

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<PrivateRoute><SeminarDashboard /></PrivateRoute>} />
        {/* <Route path="/login" element={<Login />} />

        <Route path="/classroom" element={<PrivateRoute><Classroom /></PrivateRoute>} />
        <Route path="/school" element={<PrivateRoute><School /></PrivateRoute>} /> */}
      </Routes>
    </Router>
    </>
  );
}

export default App;