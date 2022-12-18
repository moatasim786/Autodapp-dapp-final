import React, { FC, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Web3 from 'web3';
import { useBtnConnect } from '../walletHooks/component/hooks/useBtnConnect';
import { useWeb3React } from '@web3-react/core';

interface warningProps {
  payBalance: boolean;
  payBalanceBtn: boolean;
  activeBalanceBtn: boolean;
  transactionBtn: boolean;
}

export const Warning: FC<warningProps> = ({
  payBalance,
  payBalanceBtn,
  activeBalanceBtn,
  transactionBtn,
}) => {
  const { chainId } = useWeb3React();
  const { account, chain } = useBtnConnect();

  useEffect(() => {
    if (account) {
      if (!chain) {
        if (chainId === 338 || chainId === 1 || chainId === 56 || chainId === 97) {
          toast.success(`Connected to 
        ${
          chainId === 338 || chainId === 1
            ? ' ETH Network'
            : chainId === 56 || chainId === 97
            ? ' BSC Network'
            : ''
        }`);
        } else {
          toast.error('Please Choose BSC or ETH network!');
        }
      }
    }
  }, [account, chainId, chain]);

  return (
    <div>
      <ToastContainer
        autoClose={3000}
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
