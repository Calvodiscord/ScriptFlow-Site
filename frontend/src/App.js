import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminPanel from './pages/AdminPanel';
import Navbar from './components/Navbar';
import { jwtDecode } from 'jwt-decode'; // Instale com: npm install jwt-decode

const App = () => {
    const token = localStorage.getItem('token');
    let user = null;
    if (token) {
        user = jwtDecode(token);
    }

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {user && user.user.isAdmin && <Route path="/admin" element={<AdminPanel />} />}
            </Routes>
        </Router>
    );
};

export default App;
