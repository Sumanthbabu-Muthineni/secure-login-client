import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.css';

const Welcome = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [isDeleting, setIsDeleting] = useState(false);


    useEffect(() => {
        // Get user data from location state or localStorage
        const user = location.state?.user;
        if (user) {
            console.log('User data from location state:', user);
            setUserData(user);
            setLoading(false);
        } else {
            // If no user in state, redirect to login
            console.log('No user data found, redirecting to login');
            navigate('/');
        }
    }, [location, navigate]);

    const handleLogout = () => {
        // Clear any stored tokens
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleDeleteAccount = async () => {
        try {
            // Get the user data from state
            const email = userData?.email;
            
            console.log('User data for deletion:', userData);
            console.log('Email for deletion:', email);
            
            if (!email) {
                setError('User information not available. Please log in again.');
                return;
            }
            
            console.log('Sending delete request for email:', email);
            console.log('API URL:', `${process.env.REACT_APP_API_URL}/users/delete-account`);
            
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/delete-account`, {
                email: email
            });
            
            console.log('Delete response:', response.data);
            
            if (response.data.success) {
                // Clear any stored user data
                localStorage.removeItem('token');
                
                // Redirect to login page with success message
                navigate('/', { 
                    state: { 
                        message: 'Your account has been deleted successfully.' 
                    } 
                });
            } else {
                setError('Failed to delete account. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            console.error('Error response:', error.response?.data);
            setError(error.response?.data?.message || 'Failed to delete account. Please try again.');
        }
        finally {
            setIsDeleting(false);
        }
    };

    // Extract name from email if name is not available
    const displayName = userData?.name || userData?.email?.split('@')[0] || 'User';

    if (loading) {
        return (
            <div className="container">
                <div className="form-container">
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="form-container">
                <h2>Welcome, {displayName}!</h2>
                
                {userData?.image && (
                    <div style={{ margin: '20px 0' }}>
                        <img 
                            src={`${process.env.REACT_APP_API_URL}/${userData.image}`} 
                            alt="Profile" 
                            style={{ 
                                width: '100px', 
                                height: '100px', 
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} 
                        />
                    </div>
                )}
                
                <div style={{ margin: '20px 0', textAlign: 'left' }}>
                    <p><strong>Email:</strong> {userData?.email}</p>
                    {userData?.companyName && <p><strong>Company:</strong> {userData.companyName}</p>}
                    {userData?.age && <p><strong>Age:</strong> {userData.age}</p>}
                    {userData?.dob && <p><strong>Date of Birth:</strong> {new Date(userData.dob).toLocaleDateString()}</p>}
                </div>
                
                {error && <div className="error-message">{error}</div>}
                
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
                    <button onClick={handleLogout} style={{ flex: 1 }}>
                        Logout
                    </button>
                                        <button 
                        onClick={handleDeleteAccount} 
                        disabled={isDeleting}
                        style={{ 
                            flex: 1, 
                            backgroundColor: '#e74c3c'
                        }}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete Account'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;