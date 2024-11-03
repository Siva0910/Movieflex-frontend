import React, { useState } from 'react';
import { signup, verifyOtp } from '../services/authService';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', username: '', password: '', otp: '' });
  const [statusDescription, setStatusDescription] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    const response = await signup(formData.name, formData.email, formData.username, formData.password);
    setStatusDescription(response.statusDescription);
    if (response.statusCode === '200') {
      setIsOtpSent(true);
    }
  };

  const handleOtpVerification = async () => {
    const response = await verifyOtp(formData.otp, formData.email);
    setStatusDescription(response.statusDescription);
    if (response.statusCode === '200') {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      window.location.href = '/home'; 
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow" style={{ width: '50%', margin: '0 auto' }}>
        <div className="card-body">
          <h2 className="text-center">Signup</h2>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} />
          </div>
          {!isOtpSent ? (
            <div className="text-center">
              <button className="btn btn-primary" onClick={handleSignup}>Sign Up</button>
            </div>
          ) : (
            <>
              <div className="mb-3 mt-3">
                <label className="form-label">Enter OTP</label>
                <input type="text" className="form-control" name="otp" value={formData.otp} onChange={handleChange} />
              </div>
              <div className="text-center">
                <button className="btn btn-success" onClick={handleOtpVerification}>Verify OTP</button>
              </div>
            </>
          )}
          {statusDescription && <div className="mt-3 alert alert-info">{statusDescription}</div>}
          
          <div className="mt-3 text-center">
            <p>Already have an account? <Link to="/">Login here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
