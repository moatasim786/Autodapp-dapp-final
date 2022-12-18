import React, { useState } from 'react';

import { authAxios } from '../axios';
import { saveLocal } from '../utils';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const url = '/checkUser';

  const navigate = useNavigate();
  const [axiosError, setAxiosError] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const handleLogin = async (data: any) => {
    const res = await authAxios({ data, url, setAxiosError });

    if (res?.code === "SR") {
      localStorage.setItem('token', data.email)
      navigate('/');
    }

    if (res?.option) {
      saveLocal('autodapp_user_option', res?.option)
    }
  };

  return (
    <div className="card-body p-5 text-center">
      <form onSubmit={handleSubmit(handleLogin)}>
        <h3 className="mb-5">Sign in</h3>
        <div className="form-floating mb-3">
          <input
            {...register('email', {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
            type="email"
            className="form-control"
            id="emailId"
            placeholder="name@example.com"
          />
          <label>Email address</label>
          {errors.email && (
            <div className="alert alert-danger">
              <div>Enter valid email id</div>
            </div>
          )}
          {axiosError ? (
            <div className="alert alert-danger">
              <div>{axiosError}</div>
            </div>
          ) : null}
        </div>
        <div className="form-floating mb-3">
          <input
            {...register('password', {
              required: true,
              // pattern: /[a-z0-9A-Z]{8,16}/,
            })}
            type="password"
            className="form-control"
            id="formPass"
            placeholder="Password"
          />
          <label>Password</label>
          {errors.password && (
            <div className="alert alert-danger">
              <div>Enter valid password id</div>
            </div>
          )}
        </div>

        <div className="mb-4" style={{ padding: '20px' }}>
          <label
            className="lable"
            onClick={() => navigate('/auth/register')}
            style={{ textAlign: 'left', display: 'inline', float: 'left' }}>
            SignUp
          </label>
          <label
            className="lable"
            onClick={() => navigate('/auth/forgot')}
            style={{ textAlign: 'left', display: 'inline', float: 'right' }}>
            Forgot Password ?
          </label>
        </div>

        <button className="btn btn-primary btn-lg btn-block" type="submit">
          Login
        </button>

        <hr className="my-4" />
      </form>
    </div>
  );
};
