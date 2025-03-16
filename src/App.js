import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ThankYou from './components/ThankYou';
import Welcome from './components/Welcome';
import OtpVerification from './components/OtpVerification';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/otp" element={<OtpVerification />} />
            </Routes>
        </Router>
    );
};

export default App;