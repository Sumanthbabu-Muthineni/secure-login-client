import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Import your CSS file

const OtpVerification = ({ email }) => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const navigate = useNavigate();

    useEffect(() => {
        // Countdown timer for OTP expiration
        if (timeLeft <= 0) return;
        
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        // Trim the OTP to remove any whitespace
        const trimmedOtp = otp.trim();
        
        try {
            console.log('Sending OTP verification request:', { email, otp: trimmedOtp });
            
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/verify-otp`, { 
                email, 
                otp: trimmedOtp 
            });
            
            if (response.data.success) {
                // Store token in localStorage
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                }
                
                // Get user data from response if available
                const userData = response.data.user || { email };
                navigate('/welcome', { state: { user: userData } });
            } else {
                setError('Invalid OTP. Please try again.');
            }
        } catch (err) {
            console.error('Full error object:', err);
            setError(err.response?.data?.message || 'Error verifying OTP. Please try again.');
            console.error('Verification error:', err.response?.data);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="form-container otp-container">
                <div className="otp-header">
                    <h2>Verify Your Identity</h2>
                    <div className="otp-email">
                        <p>We've sent a 6-digit code to</p>
                        <p className="email-address">{email}</p>
                    </div>
                </div>
                
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleVerifyOtp} className="otp-form">
                    <div className="otp-input-container">
                        <input
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength={6}
                            pattern="\d{6}"
                            required
                            aria-label="OTP Code"
                            className="otp-input"
                            autoFocus
                        />
                    </div>
                    
                    <div className={`timer ${timeLeft < 60 ? 'timer-warning' : ''}`}>
                        Time remaining: {formatTime(timeLeft)}
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={isLoading || timeLeft <= 0}
                        className="otp-button"
                    >
                        {isLoading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>
                
                {timeLeft <= 0 && (
                    <div className="otp-expired">
                        <p>OTP expired. <a href="/" className="return-link">Return to login</a></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OtpVerification; 