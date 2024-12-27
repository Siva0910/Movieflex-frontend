import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [statusDescription, setStatusDescription] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value.toString().trim() });
  };

  const handleLogin = async () => {
    const response = await login(credentials.email, credentials.password);
    setStatusDescription(response.statusDescription);
    if (response.statusCode === '200') {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      navigate('/home'); 
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow" style={{ width: '50%', margin: '0 auto' }}>
        <div className="card-body">
          <h2 className="text-center">Login</h2>
          <div className="mb-3">
            <label className="form-label">Email</label>
            {/* style={{ width: '50%', margin: '0 auto' }} */}
            <input type="email" className="form-control" name="email" value={credentials.email} onChange={handleChange}  />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={credentials.password} onChange={handleChange}  />
          </div>
          <div className="text-center mb-3">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
          {statusDescription && <div className="mt-3 alert alert-danger">{statusDescription}</div>}
          
          <div className="text-center mt-3">
            <Link to="/signup" className="btn btn-secondary">Create new account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
