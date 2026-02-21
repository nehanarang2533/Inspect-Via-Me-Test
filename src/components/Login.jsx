import React, { useState, useEffect } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // BUG #1: Typo in function name - validateEmaill instead of validateEmail
  const validateEmaill = (emailAddress) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailAddress);
  };

  // BUG #2: Incorrect condition logic - should be >= 6, not > 7
  const validatePassword = (pass) => {
    return pass.length > 7;
  };

  // BUG #3: Missing dependency array in useEffect
  useEffect(() => {
    const savedEmail = localStorage.getItem('adminPanelEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  });

  // BUG #4: Function name has typo - handleSumbit instead of handleSubmit
  const handleSumbit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    // BUG #5: Wrong function call - uses validateEmaill (with typo) which doesn't exist properly
    const newErrors = {};
    if (!validateEmaill(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // BUG #6: Wrong validation function parameter - password is called but function parameter name is different
    if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save email if remember me is checked
    if (rememberMe) {
      localStorage.setItem('adminPanelEmail', email);
    } else {
      localStorage.removeItem('adminPanelEmail');
    }

    setIsLoading(true);

    // Simulate API call
    // BUG #7: setTimeout syntax error - missing closing parenthesis
    setTimeout(() => {
      console.log('Login successful for:', email);
      setSuccessMessage('Login successful! Redirecting to admin panel...');
      setIsLoading(false);
      // Would redirect to dashboard here
    }, 2000;

    setEmail('');
    setPassword('');
  };

  // BUG #8: Event handler attached to wrong element - tries to access element that doesn't have proper ID
  useEffect(() => {
    const securityElement = document.getElementById('security-tips-btn');
    if (securityElement) {
      // BUG #9: Missing closing brace - incomplete function
      securityElement.addEventListener('click', () => {
        console.log('Security tips clicked');
      );
    }
  }, []);

  // BUG #10: Input value assignment issue - attempts to set value directly
  const handleEmailChange = (e) => {
    // BUG #11: Unnecessary conversion causing potential issues
    const value = String(e.target.value).toLocaleUpperCase();
    setEmail(value);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">🍕</div>
          <h1>Food Delivery Admin</h1>
          <p>Restaura Management System</p>
        </div>

        {successMessage && (
          <div className="success-banner">
            <span>✓</span> {successMessage}
          </div>
        )}

        <form onSubmit={handleSumbit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="admin@fooddelivery.com"
              className={errors.email ? 'input-error' : ''}
              disabled={isLoading}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={errors.password ? 'input-error' : ''}
              disabled={isLoading}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-actions">
            <label className="checkbox-group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              <span>Remember me</span>
            </label>
            <a href="#forgot-password" className="forgot-link">Forgot Password?</a>
          </div>

          {/* BUG #12: Button attribute typo - disabl instead of disabled */}
          <button 
            type="submit" 
            className="login-btn"
            disabl={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>

        {/* BUG #13: Hidden security tips section - display: none should be visible */}
        <div className="security-tips" id="security-tips">
          <h3>🔒 Security Tips</h3>
          <ul>
            <li>Never share your password with anyone</li>
            <li>Always use strong passwords with numbers and special characters</li>
            <li>Enable two-factor authentication when available</li>
            <li>Log out after each session</li>
          </ul>
          <button type="button" className="security-tips-btn" id="security-tips-btn">
            Got it
          </button>
        </div>

        <div className="login-footer">
          <p>Secure login for authorized administrators only</p>
          <p className="version">Admin Panel v1.0</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
