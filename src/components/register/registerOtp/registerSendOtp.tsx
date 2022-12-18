import React, { FC, useEffect, useState } from 'react';

import { authAxios } from '../../axios';
import { useNavigate } from 'react-router-dom';

interface registerProps {
  register: any;
  errors: any;
  axiosError: any;
  watch: any;
  clearErrors: any;
  setAxiosError: any;
}
 const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');

export const RegisterSendOtp: FC<registerProps> = ({ axiosError, register, errors, watch, clearErrors, setAxiosError}) => {
  const navigate = useNavigate();
  const [currentCount, setCount] = useState(30)
  const timer = () => setCount(currentCount - 1);
  const email = localStorage.getItem('auto_dapp_email')

  const resendOtp = () => {
    setCount(30)
    const url = '/resendOTP';
    const data = {email}
    authAxios({url, data, setAxiosError})
  }
  
  useEffect(
    () => {
      if (currentCount <= 0) {
        return;
      }
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  },[currentCount]);

  return (
    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
      <div
        className="card shadow-2-strong card-body p-5 text-center"
        style={{ borderRadius: '1rem' }}>
        {' '}
        <h3 className="mb-5">Sign Up</h3>
        <div className="form-floating mb-3">
          <input
            {...register('email', {
              required: true,
            })}
            type="text"
            readOnly
            className="form-control"
            id="email"
            value={email}
          />
          <label>Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            {...register('firstName')}
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Username"
          />
          <label>Enter Your Username </label>
          {errors.firstName && (
            <div className="alert alert-danger">
              <span className="text-danger">Username is required</span>
            </div>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            {...register('password', {
              required: true,
              pattern: {
                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                message: 'error'
              },
              onChange: (e: any) => {
                if (regex.test(watch('password'))) {
                  console.log('111')
                  clearErrors('password')
                }
              }
            })}
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
          />
          <label>Password</label>
          {errors.password && (
            <div className="alert alert-danger">
              <span className="text-danger">
                Password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase
                letter and 1 number
              </span>
            </div>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            {...register('lastPassword', {
              required: true,
            })}
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Password"
          />
          <label>Confirm Password</label>
          {errors.lastPassword && (
            <div className="alert alert-danger">
              <span className="text-danger">Passwords does not match</span>
            </div>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            {...register('otp', {
              required: true,
              minLength: {
                value: 6,
                message: 'min length 6' 
              },
              onChange: (e: any) => {
                if (regex.test(watch('otp'))) {
                  console.log('111')
                  clearErrors('password')
                }
              }
            })}
            type="text"
            className="form-control"
            id="OTP"
            placeholder="Enter OTP"
          />
          <label>Enter OTP</label>
          {errors.otp && (
            <div className="alert alert-danger">
              <span className="text-danger">{errors.otp.message}</span>
            </div>
          )}
          {axiosError && (
            <div className="alert alert-danger">
              <div>{axiosError}</div>
            </div>
          )}
        </div>
        {currentCount > 0 ? 
          <span style={{
            textAlign: 'right',
            paddingBottom: '10px',
          }}>{currentCount} seconds</span>
          :
          <label style={{
            textAlign: 'right',
            paddingBottom: '10px',
          }} onClick={resendOtp}>Resend OTP</label>
        }
        
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
    </div>
  );
};
