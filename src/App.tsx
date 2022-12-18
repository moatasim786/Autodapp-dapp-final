import { Auth, Contract, Dapp, Header, Home, Register } from './components';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import AutoDappClassComponent from './components/editor/Editor';
import AutoDappEmpty from './components/emptyEditor/Editor';
import CreateToken from './components/createToken/createToken';
import { ToastContainer } from 'react-toastify';
import { findRoute } from './components/utils';
import { loadLocal } from './components/utils';

const include = ['/contract', '/create-token', '/dapp-contract', '/dapp-create-token', '/']

export const App = () => {
  const option = loadLocal('autodapp_user_option')
  const token = localStorage.getItem('token')
  const navigate = useNavigate();
  const location = useLocation()
  const isHeader = include.includes(location.pathname)
  //
  const [isAvatar, setIsAvatar] = useState(false);

  useEffect(() => {
    if (!option) {
      if (token) {
        navigate('/');
      } else {
        navigate('/auth/login');
      }
    }
  }, [option, token]);
  
  return (
    <div style={{height: '100%', background: 'rgb(109, 184, 255)'}}>
      {isHeader &&
        <div className="container">
        <Header openAva={isAvatar} setOpenAva={setIsAvatar} />
        </div>}
      <Routes>
        <Route path="/auth/:path" element={<Auth />} />
        <Route path="/auth/register/:path" element={<Register />} />
        <Route path="/" element={<Home />} />
      
        <Route path="/contract" element={
          <ProtectedRoute route={findRoute('Contract')}>
            <Contract />
          </ProtectedRoute>
        } />
        <Route path="/website" element={
          <ProtectedRoute route={findRoute('Website')}>
            <AutoDappEmpty/>
          </ProtectedRoute>
        } />
        <Route path="/template" element={
          <ProtectedRoute route={findRoute('Template')}>
            <AutoDappClassComponent/>
          </ProtectedRoute>
        } />
        <Route path="/create-token" element={
          <ProtectedRoute 
            route={findRoute('Token/Contract')}
            path={findRoute('Contract') ? '/contract' : '/'}
          >
            <CreateToken />
          </ProtectedRoute>
        } />
        <Route path="/dapp:path" element={
          <ProtectedRoute route={findRoute('Dapp')}>
            <Dapp/>
          </ProtectedRoute>
        }/>
      </Routes>
      <ToastContainer/>
    </div>
  );
};

const ProtectedRoute: React.FC<any> = ({route, children, path = '/'}) => {
  if (!route) {
    return <Navigate to={path} replace />;
  }

  return children
}