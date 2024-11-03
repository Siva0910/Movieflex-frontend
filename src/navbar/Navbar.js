import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/');
  };

  const isLoggedIn = !!localStorage.getItem('accessToken');

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {isLoggedIn && (<Link className="navbar-brand" to="/home">Home</Link>)}
        
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            {!isLoggedIn && (
              <li className="nav-item">
                {location.pathname === '/signup' ? (
                  <Link className="nav-link" to="/login">Login</Link>
                ) : location.pathname === '/login' ? (
                  <Link className="nav-link" to="/signup">Signup</Link>
                ) : null}
              </li>
            )}
          </ul>
        </div>
        {isLoggedIn && (
          <button className="btn btn-outline-danger ml-auto" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
