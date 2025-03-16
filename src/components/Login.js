import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import OtpVerification from './OtpVerification';
import './styles.css'; // Import your CSS file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const location = useLocation();

    // Check for success messages from redirects
    useEffect(() => {
        // Get message from location state (if redirected from registration or account deletion)
        if (location.state?.message) {
            setSuccessMessage(location.state.message);
            
            // Clear the location state to prevent showing the message again on refresh
            window.history.replaceState({}, document.title);
            
            // Auto-hide the success message after 5 seconds
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
            
            return () => clearTimeout(timer);
        }
    }, [location]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, { email, password });
            if (response.data.success) {
                setIsOtpSent(true);
            } else {
                setError('Sorry, we can\'t log you in.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Sorry, we can\'t log you in.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isOtpSent) {
        return <OtpVerification email={email} />;
    }

    return (
        <div className="container">
            <div className="form-container">
                <h2>Login</h2>
                
                {/* Success Message Notification */}
                {successMessage && (
                    <div className="success-message" style={{
                        backgroundColor: '#d4edda',
                        color: '#155724',
                        padding: '10px 15px',
                        borderRadius: '4px',
                        marginBottom: '20px',
                        border: '1px solid #c3e6cb',
                        animation: 'fadeIn 0.5s'
                    }}>
                        {successMessage}
                    </div>
                )}
                
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-label="Email"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        aria-label="Password"
                    />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;