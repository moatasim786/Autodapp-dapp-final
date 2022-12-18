import React, { useState } from 'react';

import { authAxios } from '../axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

export const Forgot = () => {
  const url = '/resendPassword';
  const navigate = useNavigate();
  const [axiosError, setAxiosError] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const handleForgot = async (data: any) => {
    const res = await authAxios({ data, url, setAxiosError });
    
    if (res?.code === "SR") {
      toast.success(res?.message);
      navigate('/auth/login')
    }
  };

  return (
    <div className="card-body p-5 text-center">
      <form onSubmit={handleSubmit(handleForgot)}>
        <h3 className="mb-5">Forgot Password</h3>

        <div className="form-floating mb-3">
          <input
            {...register('email', {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
          />
          <label>Email address</label>
          {errors.email ? (
            <div className="alert alert-danger">
              <div>Enter valid email id</div>
            </div>
          ) : null}
          {axiosError ? (
            <div className="alert alert-danger">
              <div>{axiosError}</div>
            </div>
          ) : null}
        </div>

        <button
          className="btn btn-primary btn-lg btn-block"
          type="submit">
          Send Password
        </button>
      </form>
    </div>
  );
};
