import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { RegisterSendOtp } from './registerOtp';
import { ToastContainer } from 'react-toastify';
import { authAxios } from '../axios';
import { useForm } from 'react-hook-form';

type Inputs = {
  email: string;
  password?: string
  lastPassword?: string
  otp?: number;
};

export const Register = () => {
  const [axiosError, setAxiosError] = useState(null);
 
  const navigate = useNavigate();
  const location = useLocation();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setError,
    clearErrors
  } = useForm<Inputs>({
    mode: 'onChange',
  });
  
  const handleRegister = async (data: any) => {
    if (errors) {
      if (location.pathname === '/auth/register') {
        localStorage.setItem('auto_dapp_email', data.email)
      
        const url = '/sendOTP';
        const res = await authAxios({ data, url, setAxiosError });
      
        if (res?.message === 'OTP Sent Successfully') {
          navigate('/auth/register/sendotp');
        }
      }
      if (location.pathname === '/auth/register/sendotp') {
        if (watch('password') !== watch('lastPassword')) {
          setError('lastPassword', { type: 'string', message: 'Passwords does not match' });
          return 
        }

        const url = '/checkOTP';
        const res = await authAxios({ data, url, setAxiosError });
        
        if (res?.code === 'SR') {
          const url = '/addUser';
          const res = await authAxios({ data, url, setAxiosError });

          if (res?.code === 'SR') {
            localStorage.removeItem('auto_dapp_email')
            localStorage.setItem('token', data.email)
            navigate('/');
          }
        }
      }
    }
  };

  return (
    <>
    <div className="bg-img-card">
      <div className="container p-5 text-center">
        <form
          className="row d-flex justify-content-center align-items-center h-100"
          style={{ borderRadius: '1rem' }}
          onSubmit={handleSubmit(handleRegister)}>
          {location.pathname === '/auth/register' && (
            <div>
              <h3 className="mb-5">Sign Up</h3>
              <div className="form-floating mb-3">
                <input
                  {...register('email', {
                    required: true,
                    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  })}
                  type="email"
                  className="form-control"
                  id="emailIdNew"
                  placeholder="name@example.com"
                />
                <label>Email address</label>
                {errors.email && (
                  <div className="alert alert-danger">
                    <div>Enter valid email id</div>
                  </div>
                )}
                {axiosError && (
                  <div className="alert alert-danger">
                    <div>{axiosError}</div>
                  </div>
                )}
              </div>
              <button className="btn btn-primary btn-lg btn-block" type="submit">
                Send OTP
              </button>
              <label
                className="lable"
                style={{
                  textAlign: 'left',
                  display: 'inline',
                  float: 'left',
                  padding: '20px',
                }}
                onClick={() => navigate('/auth/login')}>
                SignIn
              </label>
            </div>
          )}
          {location.pathname === '/auth/register/sendotp' && (
            <RegisterSendOtp 
              axiosError={axiosError} 
              register={register} 
              errors={errors} 
              watch={watch} 
              clearErrors={clearErrors} 
              setAxiosError={setAxiosError}/>
          )}
        </form>
      </div>
    </div>
    </>
  );
};
