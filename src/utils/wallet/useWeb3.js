import { encodeRaw, verifyContract } from "../helpers/verify";
import {useCallback, useEffect, useState} from "react";
import {walletAddressVar, walletVar} from "../../startup/apollo";

import ReactGA from 'react-ga';
import { VERIFY_CONTRACT } from "../../graphql/mutations/verifyContract";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import getContract from "./contracts/getContract";
import getStaking from "./contracts/staking/getStaking";
import {toast} from "react-toastify";
import { useMutation } from "@apollo/client";
import { useWeb3React } from "@web3-react/core";

const BINANCE_RPC = "https://8c4f-109-86-155-224.ngrok.io";
const walletConnectProvider = new WalletConnectProvider({
    rpc: {1: BINANCE_RPC},
});

const useWeb3 = () => {
    const [userAddress, setUserAddress] = useState(null);
    const [wallet, setWallet] = useState(null);
    const [nameWallet, setNameWallet] = useState(null);
    const {account} = useWeb3React()
    // const [verifyContract] = useMutation(VERIFY_CONTRACT)
    useEffect(() => {
        walletAddressVar({userAddress, nameWallet});
        // encodeRaw()
    }, [userAddress, nameWallet]);

    useEffect(() => {
        walletVar(wallet);
    }, [wallet]);

    const deployContract = useCallback(
        async (
            name,
            symbol,
            initialBalance,
            decimals,
            supply,
            txFee,
            burnFee,
            feeAddress,
            service,
            burn,
            mint,
            pause,
            blacklist,
            deflation,
            updateBalance,
            createTransaction,
            price,
            chainId
        ) => {
            
            if (userAddress && wallet) {
                
                const isDef =
                    burn === true ||
                    mint === true ||
                    pause === true ||
                    blacklist === true ||
                    deflation === true
                        ? false
                        : true;

                const options = getContract(
                    isDef,
                    burn,
                    mint,
                    pause,
                    blacklist,
                    deflation
                );
                
                //TODO what is feeReceiver address ??
                //TODO what is service address ??
                const contract = new wallet.eth.Contract(options.abi);
                const isDeflation = deflation ? [
                        name,
                        symbol,
                        +decimals,
                        supply,
                        txFee,
                        burnFee,
                        feeAddress,
                        userAddress,
                        service
                    ]
                    : [name, symbol, +decimals, initialBalance, userAddress, userAddress]
               
                return contract
                    .deploy({
                        data: '0x' + options.bytecode.object,
                        arguments: isDeflation
                    })
                    .send({from: userAddress})
                    .on('transactionHash', (e) => {
                        toast("Transaction Initiated!", {type: "success"});
                        // updateBalance(price);
                        // createTransaction(price);
                        return true
                    })
                    .on("error", (e) => {
                        toast(`User canceled transaction`, {type: "error"})
                        return false
                    })
                    .on("receipt", async (receipt) => {
                        console.log({receipt})
                        toast("Token created!", {type: "success"});
                        localStorage.setItem('autodapp_contact', JSON.stringify(receipt.contractAddress))
                        localStorage.setItem('autodapp_abi', JSON.stringify(options.abi))
                        const contractInfo = await new wallet.eth.getTransaction(receipt.transactionHash) 
                        console.log({contractInfo})
                        fetch(options.code)
                            .then( r => r.text() )
                            .then( t => {
                                const data = {
                                    hash: receipt.contractAddress,
                                    chainId: chainId,
                                    arguments: isDeflation,
                                    code: t,
                                    input: contractInfo?.input,
                                    parameters: deflation 
                                        ? ['string', 'string', 'uint256', 'uint256', 'uint8', 'uint8', 'address', 'address', 'address'] 
                                        : ['string', 'string', 'uint8', 'uint256', 'address', 'address']
                                }
                                console.log(data)
                                verifyContract({data, name: "CoinToken"})
                                // verifyContract({
                                //     variables: {
                                //         data: JSON.stringify(data)
                                //     }
                                // })
                            
                            })
                    })
                    // .then(res => {
                    //     toast("Токен создан!", {type: "success"});
                    // })

            }
        },
        [wallet, userAddress]
    );  
  
    const deployStaking = useCallback(async (
        chainId,
        apy,
        stakingDuration,
        lockDuration,
        maxStake,
        tokenAddress
    ) => {
    
        if (userAddress && wallet) {
            
            const contract = new wallet.eth.Contract(getStaking.abi);
            
            const ContractAarguments = [tokenAddress, +apy, +stakingDuration, +lockDuration, wallet.utils.toWei(maxStake)]
                        
            return contract
                    .deploy({
                        data: getStaking.bytecode.code,
                        arguments: ContractAarguments
                    })
                    .send({from: userAddress})
                    .on('transactionHash', (e) => {
                        toast("Start creating a contract!", {type: "success"});
                        toast("Don't close this window!", {type: "success"});
                        // updateBalance(price);
                        // createTransaction(price);
                        return true
                    })
                    .on("error", (e) => {
                        toast(`User canceled transaction`, {type: "error"})
                        return false
                    })
                    .on("receipt", async (receipt) => {
                        toast("Contract created!", {type: "success"});
                        localStorage.setItem('autodapp_contact_staking', JSON.stringify(receipt.contractAddress))
                        localStorage.setItem('autodapp_staking_abi', JSON.stringify(getStaking.abi))
                        const contractInfo = await new wallet.eth.getTransaction(receipt.transactionHash) 

                        fetch(getStaking.code)
                            .then( r => r.text() )
                            .then( t => {
                                const data = {
                                    hash: receipt.contractAddress,
                                    chainId: chainId,
                                    arguments: ContractAarguments,
                                    code: t,
                                    input: contractInfo.input,
                                    parameters: ['address', 'uint8', 'uint256', 'uint256', 'uint256']
                                }

                                console.log(data)
                                verifyContract({data, name: "Staking"})
                                // verifyContract({
                                //     variables: {
                                //         data: JSON.stringify(data)
                                //     }
                                // })
                            })
                    })
        } else {
            alert('Provider not connected')
        }
    },[wallet, userAddress])
    
    useEffect(() => {
        const wallet = new Web3(window.ethereum)
        const walletConnect = localStorage.getItem('walletconnect')
        const anotherWallet = new Web3(walletConnectProvider);
        
        if (walletConnect) {
            // console.log('1')
            const wallet = JSON.parse(walletConnect)
            if (wallet.accounts[0]) {
                setUserAddress(wallet.accounts[0])
                setWallet(anotherWallet)
            }
        }
        if (window?.ethereum?.address) {
            // console.log('1')
            setUserAddress(window.ethereum.address)
            setWallet(wallet)
            return
        } 
        if (window.web3.currentProvider.selectedAddress) {
            // console.log('2')
            setUserAddress(window.web3.currentProvider.selectedAddress)
            setWallet(wallet)
            return
        }

        if (window?.ethereum?.selectedAddress) {
            // console.log('3')
            setUserAddress(window?.ethereum?.selectedAddress)
            setWallet(wallet)
            return 
        } 
    }, [account])

    const connectWallet = useCallback((type) => {
        try {
            setNameWallet(type);
            switch (type) {
                case "metamask":
                    connectMetamask();
                    break;
                case "imToken":
                    connectImToken();
                    break;
                case "tokenPocket":
                    connectTokenPocket();
                    break;
                case "HuobiWallet":
                    connectHuobiWallet();
                    break;
                case "TrustWallet":
                    connectTrustWallet();
                    break;
                case "CoinbaseWallet":
                    connectCoinbaseWallet();
                    break;
                case "walletConnect":
                    connectWithWalletConnect();
                    break;
                default:
                    toast("Неизвестная ошибка!", {type: "error"});
            }
        } catch (e) {
            toast(e.message, {type: "error"});
        }
    }, []);

    const connectMetamask = () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            const metamask = new Web3(window.ethereum);
            window.ethereum
                .enable()
                .then(() => {
                    setWallet(metamask);
                    setUserAddress(window?.ethereum?.selectedAddress);
                    toast("Вы подключились к Metamask!", {type: "info"});
                    ReactGA.event({
                        category: 'Action',
                        action: 'WalletConnection',
                        value: window?.ethereum?.selectedAddress
                      });
                })
                .catch((e) => toast(e.message, {type: "error"}));
            window.ethereum.on("accountsChanged", (accounts) => {
                setUserAddress(accounts[0]);
            });
        } else toast("Metamask не установлен!", {type: "error"});
    };

    const connectImToken = () => {
        if (window.ethereum && window.ethereum.isImToken) {
            const imToken = new Web3(window.ethereum);
            window.ethereum
                .enable()
                .then(() => {
                    setWallet(imToken);
                    setUserAddress(window?.ethereum?.selectedAddress);
                    toast("Вы подключились к imToken!", {type: "info"});
                    ReactGA.event({
                        category: 'Action',
                        action: 'WalletConnection',
                        value: window?.ethereum?.selectedAddress
                      });
                })
                .catch((e) => toast(e.message, {type: "error"}));
            window.ethereum.on("accountsChanged", (accounts) => {
                setUserAddress(accounts[0]);
            });
        } else toast("imToken не установлен!", {type: "error"});
    };

    const connectTokenPocket = () => {
        if (window.ethereum && window.ethereum.isTokenPocket) {
            const tokenPocket = new Web3(window.ethereum);
            window.ethereum
                .enable()
                .then(() => {
                    setWallet(tokenPocket);
                    setUserAddress(window?.ethereum?.selectedAddress);
                    toast("Вы подключились к TokenPocket!", {type: "info"});
                    ReactGA.event({
                        category: 'Action',
                        action: 'WalletConnection',
                        value: window?.ethereum?.selectedAddress
                      });
                })
                .catch((e) => toast(e.message, {type: "error"}));
            window.ethereum.on("accountsChanged", (accounts) => {
                setUserAddress(accounts[0]);
            });
        } else toast("TokenPocket не установлен!", {type: "error"});
    };

    const connectHuobiWallet = () => {
        if (window.ethereum && window.ethereum.isHbWallet) {
            const hbWallet = new Web3(window.ethereum);
            window.ethereum
                .enable()
                .then(() => {
                    setWallet(hbWallet);
                    setUserAddress(window?.ethereum?.address);
                    toast("Вы подключились к Huobi Wallet!", {type: "info"});
                    ReactGA.event({
                        category: 'Action',
                        action: 'WalletConnection',
                        value: window?.ethereum?.address
                      });
                })
                .catch((e) => toast(e.message, {type: "error"}));
            window.ethereum.on("accountsChanged", (accounts) => {
                setUserAddress(accounts[0]);
            });
        } else toast("Huobi Wallet не установлен!", {type: "error"});
    };

    const connectTrustWallet = () => {
        if (window.ethereum && window.ethereum.isTrust) {
            const trustWallet = new Web3(window.ethereum);
            window.ethereum
                .enable()
                .then(() => {
                    setWallet(trustWallet);
                    setUserAddress(window?.ethereum?.address);
                    toast("Вы подключились к Trust Wallet!", {type: "info"});
                    ReactGA.event({
                        category: 'Action',
                        action: 'WalletConnection',
                        value: window?.ethereum?.address
                      });
                })
                .catch((e) => toast(e.message, {type: "error"}));
            window.ethereum.on("accountsChanged", (accounts) => {
                setUserAddress(accounts[0]);
            });
        } else toast("Trust Wallet не установлен!", {type: "error"});
    };

    const connectCoinbaseWallet = () => {
        if (window.ethereum && window.ethereum.isCoinbaseWallet) {
            const coinbaseWallet = new Web3(window.ethereum);
            window.ethereum
                .enable()
                .then(() => {
                    setWallet(coinbaseWallet);
                    setUserAddress(window?.ethereum?.selectedAddress);
                    toast("Вы подключились к Coinbase Wallet!", {type: "info"});
                    ReactGA.event({
                        category: 'Action',
                        action: 'WalletConnection',
                        value: window?.ethereum?.selectedAddress
                      });
                })
                .catch((e) => toast(e.message, {type: "error"}));
            window.ethereum.on("accountsChanged", (accounts) => {
                setUserAddress(accounts[0]);
            });
        } else toast("Coinbase Wallet не установлен!", {type: "error"});
    };

    const connectWithWalletConnect = () => {
        walletConnectProvider
            .enable()
            .then(() => {
                const walletConnect = new Web3(walletConnectProvider);
                if (walletConnectProvider.accounts.length) {
                    setWallet(walletConnect);
                    setUserAddress(walletConnectProvider.accounts[0]);
                    toast("Вы подключились через WalletConnect!", {
                        type: "info",
                    });
                    ReactGA.event({
                        category: 'Action',
                        action: 'WalletConnection',
                        value: walletConnectProvider.accounts[0]
                      });
                }
            })
            .catch((e) => toast(e.message, {type: "error"}));
        walletConnectProvider.on("accountsChanged", (accounts) => {
            setUserAddress(accounts[0]);
        });
        walletConnectProvider.on("disconnect", () => {
            setWallet(null);
            setUserAddress(null);
            toast("Вы отключились от кошелька!", {type: "info"});
        });
    };

    return {userAddress, wallet, connectWallet, deployContract, deployStaking};
};

export default useWeb3;
