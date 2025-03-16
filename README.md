
## Client Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sumanthbabu-Muthineni/secure-login-client
   cd secure-login-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment variables**
   Create a `.env` file in the client directory with:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the client**
   ```bash
   npm start
   ```
   The client will start running on http://localhost:3000


# Secure Login System - Flow Structure

## Login Flow
1. Login page (email/password) → Backend authentication → OTP generation and email
2. OTP verification screen → Backend OTP validation → JWT token generation
3. Welcome page with user profile → User session established

## Registration Flow
1. Registration form (personal details + image) → Password strength validation
2. Form submission → Backend validation → Data storage in MongoDB
3. Success message → Redirect to login page

## Account Management
1. Welcome page → User profile display (name, email, company, age, DOB, image)
2. Logout button → Clear token → Redirect to login page
3. Delete Account → Backend deletion → Success message → Login page

## Security Features
1. Two-factor authentication → Email OTP → 5-minute expiration
2. Password security → Bcrypt hashing → Strength validation
3. JWT authentication → Secure token → 1-hour expiration
4. Input validation → Frontend + Backend checks → Error handling

## User Experience
1. Responsive design → Mobile/tablet/desktop compatibility
2. Visual feedback → Loading states → Success/error messages
3. Accessibility features → ARIA labels → Semantic HTML

# Getting Started with Create React App



