import { useEffect, useState } from 'react';

import Web3 from 'web3';
import { exitApp } from '../../../utils';
import { useConnectors } from './useConnectors';
import { useNavigate } from 'react-router';
import { useWeb3React } from '@web3-react/core';

const include = [338, 25,56,97]

export const useBtnConnect = () => {
  const { library, account, chainId, activate, deactivate, active } = useWeb3React();
  const navigate = useNavigate()
  const [chain, setChain] = useState(false);

  useEffect(() => {
    if (chainId && include.includes(chainId)) {
      setChain(true);
    } else {
      setChain(false);
    }
  }, [chainId]);

  const { connectors } = useConnectors();

  const [isOpen, setIsOpen] = useState(false);
  const [balance, setBalance] = useState('0.00');

  let web3 = new Web3(library?.provider);
  
  const getInfo = async () => {
    const balance = await web3.eth.getBalance(account + '');
  
    if (balance) {
      setBalance(balance);
    }
  };

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  const refreshState = () => {
    window.localStorage.setItem('provider', '');
  };

  const disconnect = () => {
    refreshState();
    deactivate();
    exitApp()
    navigate('/')
  };

  useEffect(() => {
    const provider = window.localStorage.getItem('provider');

    if (provider) {
      activate(connectors[provider]);
    }

    if (account) {
      getInfo();
    }
  }, [account, active, activate]);

  return {
    active,
    openModal,
    balance,
    account,
    disconnect,
    isOpen,
    chain,
  };
};
