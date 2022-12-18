import './contract.scss';

import { Button, Header } from '..';
import React, { useState } from 'react';

import Modal from '../modals/contractModal';
import { loadLocal } from '../utils';
import { useForm } from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import useWeb3 from '../../utils/wallet/useWeb3';
import { useWeb3React } from '@web3-react/core';
import { userApi } from '../api/user';

export const Contract = (props) => {
  const {deployStaking, wallet} = useWeb3();
  const navigate = useNavigate()
  const token = loadLocal('autodapp_contact')

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });
  
  const [isAvatar, setIsAvatar] = useState(false);
  const [open, setOpen] = useState(false);
  
  const handleContract = async (data) => {
    const chainId = await wallet?.eth.getChainId();
    
    if (!token) return alert('Token not found')
    if (!chainId) return alert('chainId not found')

    const res = await deployStaking(
      chainId,
      data.apy,
      data.stakingDuration,
      data.lockDuration,
      data.maxStake,
      token
      )
      
      if (props?.option && res) {
        userApi.deleteOption('Dapp-contract', false);
        navigate('/dapp-website');
      } 
      // console.log('res', res)
      if (!props?.option && res) {
        userApi.deleteOption('Contract', false);
        setOpen(true)
      }
  }; 

  return (
    <>
    <div className="home contract">
      <div className="container">
        {/* <Header openAva={isAvatar} setOpenAva={setIsAvatar} /> */}
        <h1 className="home__title text-center">Launch your Staking contract for your Token! </h1>
        <form className="contract__from" onSubmit={handleSubmit(handleContract)}>
          <div className="contract__from-item">
            <p>Token</p>
            <input
              {...register('token', {
                required: true,
              })}
              type="text"
              placeholder="0xC921b16Ee4B3A17f0A2b15df0E6b3F0a0de33d28"
              value={token ? token : ''}
            />
            {errors.token && (
              <div className="alert alert-danger contract__error">
                <div>Enter valid token</div>
              </div>
            )}
          </div>
          <div className="contract__from-item">
            <p>APY (%)</p>
            <input
              {...register('apy', {
                required: true,
                validate: (value) => {
                  if (value > 255) {
                    return 'Max Apy 255'
                  }
                }
              })}
              type="text"
              placeholder="Enter the Fixed APY in %"
            />
            {errors.apy && (
              <div className="alert alert-danger contract__error">
                <div>{errors.apy.message || 'Enter valid APY'}</div>
              </div>
            )}
          </div>
          <div className="contract__from-item">
            <p>Staking Duration</p>
            <input
              {...register('stakingDuration', {
                required: true
              })}
              type="text"
              placeholder="Enter the Staking Duration in Days (Eg. 365)"
            />
            {errors.stakingDuration && (
              <div className="alert alert-danger contract__error">
                <div>Enter valid Staking Duration</div>
              </div>
            )}
          </div>
          <div className="contract__from-item">
            <p>Lock Duration</p>
            <input
              {...register('lockDuration', {
                required: true
              })}
              type="text"
              placeholder="Enter the Token Lock Duration in Days "
            />
            {errors.lockDuration && (
              <div className="alert alert-danger contract__error">
                <div>Enter valid Lock Duration</div>
              </div>
            )}
          </div>
          <div className="contract__from-item">
            <p>Max Stake</p>
            <input
              {...register('maxStake', {
                required: true
              })}
              type="text"
              placeholder="Max Tokens a user can stake (Eg. 100000000)"
            />
            {errors.maxStake && (
              <div className="alert alert-danger contract__error">
                <div>Enter valid Max Stake</div>
              </div>
            )}
          </div>
          <Button children="Deploy Contract" className="card__btn" type="submit" />
        </form>
      </div>
    </div>
    <Modal
      setOpen={setOpen}
      open={open}
    />
    </>
  );
};
