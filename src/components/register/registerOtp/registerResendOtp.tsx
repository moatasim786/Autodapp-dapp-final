import React, { FC } from 'react';

import { useNavigate } from 'react-router-dom';

interface registerProps {
  register: any;
  errors: any;
  axiosError: any;
}

export const RegisterResendOtp: FC<registerProps> = ({ axiosError, register, errors }) => {
  const navigate = useNavigate();

  return (
    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
      <div
        className="card shadow-2-strong card-body p-5 text-center"
        style={{ borderRadius: '1rem' }}>
        <h3 className="mb-5">Sign Up</h3>
        <div className="form-floating mb-3">
          <input
            {...register('otp', {
              required: true,
            })}
            type="number"
            className="form-control"
            id="otp"
            placeholder="Enter OTP"
          />
          <label>Enter OTP</label>
          {errors.otp && (
            <div className="alert alert-danger">
              <span className="text-danger">OTP is required</span>
            </div>
          )}
          {axiosError && (
            <div className="alert alert-danger">
              <div>{axiosError}</div>
            </div>
          )}
        </div>
        <label style={{ textAlign: 'right', display: 'block', padding: '10px' }}>seconds</label>
        <label style={{ textAlign: 'right', display: 'block', padding: '10px' }}>Resend OTP</label>
        <button className="btn btn-primary btn-lg btn-block" type="submit">
          Login
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
