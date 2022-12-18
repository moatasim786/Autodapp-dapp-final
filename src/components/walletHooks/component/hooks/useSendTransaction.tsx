import React from 'react';
import Web3 from 'web3';
import { routes } from '../../../../routes';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useWeb3React } from '@web3-react/core';
import { userApi } from '../../../api/user';

const ADDRESS = '0xB3EBD0c0255dA5B3E745EC1b92cdbd95869dBdFf';

type active = "Token/Contract" | "Website" | "Dapp"

export const useSendTransaction = () => {
  const email = localStorage.getItem('token')
  const { library, account } = useWeb3React();
  const navigate = useNavigate()
  let web3 = new Web3(library?.provider);
  
  const setTransaction = async (amount: number, activeCard: active) => {
    const data = {wallet: account, option: activeCard, email: email}
    
    if (!email) {
      toast.error('You are not authorized');
      return;
    }

    if (account) {
      const value = amount * 10 ** 18;
      
      await web3.eth
        .sendTransaction({ to: ADDRESS, from: account, value: +value })
        .on('transactionHash', (e) => {
          toast.success('Transaction Initiated');
          toast.success('Do not close or reload this window!');
          return true
        })
        .once('receipt', async function (receipt) {
          if (receipt) {
            toast.success('Success transaction');
            if (activeCard === "Token/Contract") {
              const additionOption = {wallet: account, option: "Contract", email: email}
              await userApi.addOption(additionOption)
              const res = await userApi.addOption(data)

              if (res) {
                navigate(routes[activeCard])
              }
              return
            }
            if(activeCard === "Dapp") {
              const additionOption = {wallet: account, option: "Token", email: email}
              const additionOption2 = {wallet: account, option: "Dapp-contract", email: email}
              await userApi.addOption(additionOption)
              await userApi.addOption(additionOption2)
              const res = await userApi.addOption(data)
              
              if (res) {
                navigate(routes[activeCard])
              }
              return
            } else {
              const res = await userApi.addOption(data)
              if (res) {
                navigate(routes[activeCard])
              }
            }
            
          }
        })
        .on('error', function (error) {
          if (error) {
            toast.error('User denied transaction signature');
          }
        });
    } else {
      console.log('transaction error');
    }
  };

  return { setTransaction };
};
