import React from "react";
import { useConnectors } from "./useConnectors";
import { useWeb3React } from "@web3-react/core";

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

export const useModalConnectors = (RPC: object, portisId: string) => {
  const { activate } = useWeb3React();
  const { connectors } = useConnectors(RPC, portisId);

  const setProvider = (type: string) => {
    
    if (type) {
      window.localStorage.setItem("provider", type);
      if (type === "injected" && !window.web3 && !window.ethereum) {
        alert("Recommended to install MetaMask wallet https://metamask.io/ ");
      }
    }
    
    switch (type) {
      case "injected":
        activate(connectors.injected);
        break;
      case "walletconnect":
        activate(connectors.walletconnect);
        break;
      case "coinbaseWallet":
        activate(connectors.coinbaseWallet);
        break;
      case "fortmatic":
        activate(connectors.fortmatic);
        break;
      case "portis":
        activate(connectors.portis);
        break;

      default:
        break;
    }
  };
  return { setProvider };
};
