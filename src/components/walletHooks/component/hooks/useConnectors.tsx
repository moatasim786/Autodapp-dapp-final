import { useEffect, useState } from "react";

import { FortmaticConnector } from "@web3-react/fortmatic-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { PortisConnector } from "@web3-react/portis-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import {useWeb3React} from '@web3-react/core';

const support = [338, 1, 56,97]

export const useConnectors = (RPC?: object, portisId?: string) => {
  const [supportedChainIds, setSupportedChainIds] = useState<number[]>();
  
  const { chainId } = useWeb3React()

  const getChainIds = (RPC:object) => {
    const chainIds = Object.keys(RPC).map(string => +string)
    
    setSupportedChainIds([...chainIds, ...support])

    if (chainId) {
      if (chainIds.includes(chainId)) return
      return console.error('Yours chain id is not supports')
    }
  };

  useEffect(() => {
    RPC && getChainIds(RPC)
  }, [RPC, chainId]);  

  const walletconnect = new WalletConnectConnector({
    //@ts-ignore
    rpc: RPC,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    //@ts-ignore
    pollingInterval: 12000,
    supportedChainIds: supportedChainIds,
  });

  const walletlink = new WalletLinkConnector({
    //@ts-ignore
    rpc: RPC,
    appName: "walletlink",
    supportedChainIds: supportedChainIds,
  });

  const injected = new InjectedConnector({
    //@ts-ignore
    rpc: RPC,
    appName: "wallet injected",
    supportedChainIds: supportedChainIds,
  });

  const fortmatic = new FortmaticConnector({
    //Test Rinkeby, Kovan, Ropsten : pk_test_5738055D79822432
    //Production localhost : pk_live_5ECD887F1C653961
    apiKey: "pk_live_5ECD887F1C653961",
    chainId: 1,
  });

  const getPortis = () => {
    if (portisId) {
      return new PortisConnector({
        dAppId: portisId,
        networks: [1, 100],
      });
    }
    return
  };

  const connectors: any = {
    injected: injected,
    walletconnect: walletconnect,
    coinbaseWallet: walletlink,
    fortmatic: fortmatic,
    portis: getPortis(),
  };

  return {
    connectors,
  };
};
