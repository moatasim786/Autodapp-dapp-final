import { Forgot, Login, Register } from '..';

import React from 'react';
import { useLocation } from 'react-router-dom';

export const Auth = () => {
  const location = useLocation();
  
  return (
    <div className="bg-img-card vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
              {location.pathname === '/auth/login' && <Login />}
              {location.pathname === '/auth/register' && <Register />}
              {location.pathname === '/auth/forgot' && <Forgot />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
