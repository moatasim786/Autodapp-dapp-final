import './createToken.scss';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import BSC from '../image/createTokenImages/bsc.svg';
import BurnFee from './BurnFee/BurnFee';
import { CREATE_TRANSACTION } from '../../graphql/mutations/createTransaction';
import CRO from '../image/cro.png';
import Close from '../image/close.svg';
import CoinbaseWalletIcon from '../image/createTokenImages/coinbase.png';
import CountSymbols from './IncDincField/CountSymbols';
import CountTokens from './IncDincField/CountTokens';
import CountTransactions from './CountTransactions/CountTransactions';
import ETH from '../image/createTokenImages/eth.svg';
import { GET_USER_QUERY } from '../../graphql/queries/getUser';
import { Header } from '../header';
import HoldersRewardFee from './HoldersRewardFee/HoldersRewardFee';
import HuobiIcon from '../image/createTokenImages/huiobi.png';
import ImtokenIcon from '../image/createTokenImages/imtoken.png';
import MATIC from '../image/createTokenImages/matic.svg';
import MetamaskIcon from '../image/createTokenImages/metamask.svg';
import ReactGA from 'react-ga';
import TRON from '../image/createTokenImages/tron.svg';
import TaxRecieveAddress from './TaxRecieveAddress/TaxRecieveAddress';
import TokenCard from './Card/TokenCard';
import { Tooltip } from 'bootstrap';
import TrustWalletIcon from '../image/createTokenImages/TWT.png';
import { UPDATE_USER_BALANCE } from '../../graphql/mutations/updateBalanceUser';
import WalletConnectIcon from '../image/createTokenImages/walletconect.svg';
import classNames from 'classnames';
import client from '../../startup/apollo';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import useTronWeb from '../../utils/wallet/useTronWeb';
import useWeb3 from '../../utils/wallet/useWeb3';
import { userActions } from '../../redux/actions';
import { userApi } from '../api/user';

// import TokenpocketIcon from '../image/createTokenImages/tokenpocket.svg';

const cards = {
  tokenCards: [
    // {
    //   id: 1,
    //   name: 'Ethereum',
    //   image: ETH,
    //   route: 'erc-20',
    // },
    {
      id: 2,
      name: 'Binance Smart Chain',
      image: BSC,
      route: 'bip-20',
    },
    {
      id: 3,
      name: 'Cronos',
      image: CRO,
      route: 'erc-20',
    },
    // {
    //     id: 3,
    //     name: "Tron",
    //     image: TRON,
    //     route: "trc-20",
    // },
    // {
    //     id: 4,
    //     name: "Matic",
    //     image: MATIC,
    //     route: "mrc-20",
    // },
  ],
};

export const CreateToken = () => {
  const { token } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeToken, setActiveToken] = useState(token);

  const [advancedSettings, setAdvancedSettings] = useState(false);
  const [checkLocationTron, setCheckLocationTron] = useState(false);

  const [countSymbolsAfter, setCountSymbolsAfter] = useState(0);
  const [countTokens, setCountTokens] = useState(0);

  const [transactionTaxValue, setTransactionTaxValue] = useState(5);
  const [burnFeeValue, setBurnFeeValue] = useState(5);
  const [holdersRewardFeeValue, setHoldersRewardFeeValue] = useState(5);

  const [burn, setBurn] = useState(false);
  const [pause, setPause] = useState(false);
  const [mint, setMint] = useState(false);
  const [blacklist, setBlacklist] = useState(false);
  const [isDeflation, setIsDeflation] = useState(false);
  const [deflation, setDeflation] = useState(false);

  const [infoBlockFirst, setInfoBlockFirst] = useState(true);
  const [infoBlockSecond, setInfoBlockSecond] = useState(true);

  const [taxReceiveAddressValue, setTaxRecieveAddressValue] = useState('');
  const [creator, setCreator] = useState('');
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');

  //Buy tooken
  const [showModal, setShowModal] = useState(null);

  const { wallet, userAddress, deployContract } = useWeb3();
  const { defaultAddress, deployContractTron } = useTronWeb();

  const [updateBalanceUser] = useMutation(UPDATE_USER_BALANCE, {
    refetchQueries: [GET_USER_QUERY],
  });
  const [newTransaction] = useMutation(CREATE_TRANSACTION);

  const dispatch = useDispatch();

  useEffect(() => {
    Array.from(document.querySelectorAll('div[data-bs-toggle="tooltip"]')).forEach(
      (tooltipNode) => new Tooltip(tooltipNode),
    );
  }, [checkLocationTron, advancedSettings]);

  const createTransaction = async (amount) => {
    const { getUser } = client.readQuery({ query: GET_USER_QUERY });
    const chainId = await wallet?.eth.getChainId();
    try {
      let { data } = await newTransaction({
        variables: {
          fields: {
            amount,
            date: new Date(),
            details: 'Покупка токена',
            idCurrency:
              activeToken == 'erc-20'
                ? 1
                : activeToken == 'bip-20'
                ? 8
                : activeToken == 'trc-20'
                ? 7
                : activeToken == 'mrc-20'
                ? 9
                : null,
            idChainId: chainId,
            idUser: getUser?.id,
            idType: 2,
          },
        },
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const deploy = async (updateBalance, createTransaction, price) => {
    const chainId = await wallet?.eth.getChainId();
    console.log('1')
    if (token !== 'trc-20')
      return deployContract(
        name,
        symbol,
        countTokens,
        countSymbolsAfter,
        countTokens,
        transactionTaxValue,
        burnFeeValue,
        taxReceiveAddressValue,
        taxReceiveAddressValue,
        burn,
        mint,
        pause,
        blacklist,
        isDeflation,
        updateBalance,
        createTransaction,
        price,
        chainId,
      );
    else
      deployContractTron(
        name,
        symbol,
        countSymbolsAfter,
        countTokens,
        updateBalance,
        createTransaction,
        price,
      );
  };
  // my function
  const userBalance = 1;

  const buyToken = async () => {
    ReactGA.event({
      category: 'Click',
      action: 'TokenCreation',
    });
    if (!activeToken) {
      return toast('Choose a token', { type: 'error' });
    }

    if (!name || !symbol) {
      return toast('Fill in the fields', { type: 'error' });
    }
    if (countTokens === 0 || countSymbolsAfter === 0) {
      return toast('Choose the number of tokens ', { type: 'error' });
    }

    if (name && symbol && countTokens !== 0 && countSymbolsAfter !== 0) {
      const result = await deploy();
      
      if (result && location.pathname === '/create-token') {
        userApi.deleteOption('Token/Contract', false)
        navigate('/contract');
      }
      // console.log('dapp', result);
      if (result && location.pathname === '/dapp-create-token') {
        // console.log('dapp', result);
        userApi.deleteOption('Token', false);
        navigate('/dapp-contract');
      }
    } else {
      toast(
        'Fields - token name, symbol, number of tokens and number of decimal places are required ',
        { type: 'error' },
      );
    }
  };

  const updateBalance = (price) => {
    updateBalanceUser({
      variables: {
        balance: price,
      },
    });

    dispatch(userActions.setUserBalance(userBalance - price));
  };

  const checkAndBuy = (price) => {
    if (isDeflation && !taxReceiveAddressValue) {
      toast('Заполните поле - Адрес получения налога', { type: 'error' });
      return;
    }
    if (token !== 'trc-20') {
      if (userAddress) {
        deploy(updateBalance, createTransaction, price);
      } else setShowModal(token);
    } else if (defaultAddress) {
      deploy(updateBalance, createTransaction, price);
    } else setShowModal(token);
  };

  let countAddFunctions = +burn + +mint + +pause + +blacklist + +isDeflation;

  // useEffect(() => {
  //   if (userBalance < 150) {
  //     toast('Недостаточна средств на счету', { type: 'error' });
  //   }
  //   if (userBalance < 200 && userBalance >= 150 && countAddFunctions === 0) {
  //     checkAndBuy(150);
  //   }
  //   if (userBalance < 250 && userBalance >= 200 && countAddFunctions <= 2) {
  //     if (countAddFunctions === 1 || countAddFunctions === 2) {
  //       checkAndBuy(200);
  //     } else {
  //       checkAndBuy(150);
  //     }
  //   }
  //   if (userBalance < 300 && userBalance >= 250 && countAddFunctions <= 3) {
  //     if (countAddFunctions === 1 || countAddFunctions === 2) {
  //       checkAndBuy(200);
  //     }
  //     if (countAddFunctions === 3) {
  //       checkAndBuy(250);
  //     }
  //     if (countAddFunctions === 0) {
  //       checkAndBuy(150);
  //     }
  //   }
  //   if (userBalance >= 300 && userBalance >= 250 && countAddFunctions <= 5) {
  //     if (countAddFunctions === 0) {
  //       checkAndBuy(150);
  //     }
  //     if (countAddFunctions === 1 || countAddFunctions === 2) {
  //       checkAndBuy(200);
  //     }
  //     if (countAddFunctions === 3) {
  //       checkAndBuy(250);
  //     }
  //     if (countAddFunctions === 4 || countAddFunctions === 5) {
  //       checkAndBuy(300);
  //     }
  //   }
  // }, [userBalance, countAddFunctions]);

  const dicrementTokens = () => {
    if (countTokens < 1) return;
    setCountTokens(countTokens - 1);
  };

  const incrementTokens = () => {
    setCountTokens(countTokens + 1);
  };

  const incrementSymbols = () => {
    setCountSymbolsAfter(countSymbolsAfter + 1);
  };

  const dicrementSymbols = () => {
    if (countSymbolsAfter < 1) return;
    setCountSymbolsAfter(countSymbolsAfter - 1);
  };

  const showAdvancedSettings = () => {
    setAdvancedSettings(!advancedSettings);
  };

  const showBlockDeflation = () => {
    setDeflation(!deflation);
  };

  const handleCloseFirstInfoBlock = () => {
    setInfoBlockFirst(false);
  };

  const handleCloseSecondInfoBlock = () => {
    setInfoBlockSecond(false);
  };

  const [isAvatar, setIsAvatar] = useState(false);

  return (
    <div className="main">
      <div className="main__content">
        <div className="container">
          {/* <Header openAva={isAvatar} setOpenAva={setIsAvatar} /> */}
          <div className="row pt-5">
            <div className="col-6">
              <div className="main__content-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18 title" style={{ fontSize: 18 }}>
                  Create your token
                </h4>
              </div>
            </div>
            <div className="col-6" style={{ textAlign: 'right' }}>
              <button
                onClick={() => navigate('/')}
                className={'card__btn token__btn token__btn-top'}>
                BACK
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
              {cards.tokenCards.map((i) => {
                return (
                  <div key={i.id} className="row">
                    <TokenCard
                      setActiveToken={setActiveToken}
                      {...i}
                      activeToken={activeToken}
                    />
                  </div>
                );
              })}
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="card create-token">
                <div className="card-title-big">#AutoDApp</div>
                <br />
                <div className="card-title">- Simple, Fast, Convinient !!!</div>
                <div className="card-title">- No programming skills required</div>
                <div className="card-title">- Get 100% ownership of the generated tokens.</div>
                <div className="card-title">
                  - The token will automatically be placed on the network and will be credited to
                  your wallet.
                </div>
              </div>
            </div>
          </div>
          <div className="create-token__fields">
            <div className="row" style={{ marginTop: 28 }}>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 col-12">
                <div className="row">
                  <div className="col-12">
                    <div className="token-name">Name token</div>
                    <div
                      style={{
                        position: 'relative',
                        margin: '20px 0px 25px',
                      }}>
                      <input
                        required
                        type="text"
                        placeholder={`Example: "Dogecoin"`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 col-12">
                <div className="row">
                  <div className="col-12">
                    <div className="token-name">Symbol</div>
                    <div
                      style={{
                        position: 'relative',
                        margin: '20px 0px 25px',
                      }}>
                      <input
                        required
                        type="text"
                        placeholder={`Example: "Doge"`}
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{ marginTop: 22 }}>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 col-12">
                <div className="row">
                  <div className="col-lg-6 col-12">
                    <div className="token-name">Number of tokens</div>
                    <CountTokens
                      incrementTokens={incrementTokens}
                      dicrementTokens={dicrementTokens}
                      countTokens={countTokens}
                      setCountTokens={setCountTokens}
                    />
                  </div>
                  <div className="col-lg-6 col-12"></div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 col-12">
                <div className="row">
                  <div className="col-lg-6 col-12"></div>
                  <div className="col-lg-6 col-12">
                    <div className="token-name">Number of decimal places (1-18)</div>
                    <CountSymbols
                      incrementSymbols={incrementSymbols}
                      dicrementSymbols={dicrementSymbols}
                      countSymbolsAfter={countSymbolsAfter}
                      setCountSymbolsAfter={setCountSymbolsAfter}
                    />
                  </div>
                </div>
              </div>
            </div>
            {!checkLocationTron && (
              <>
                <div className="col-12" style={{ marginTop: 26 }}>
                  <div className="row">
                    <div className="col-12">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label className="switch">
                          <input
                            id="advanced-settings"
                            type="checkbox"
                            onChange={showAdvancedSettings}
                          />
                          <span className="slider round"></span>
                        </label>
                        <label htmlFor="advanced-settings">
                          <div className="token-name">Advance settings</div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {advancedSettings && (
                  <div
                    className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 col-12"
                    style={{ marginTop: 26 }}>
                    <div className="row">
                      <div
                        data-bs-toggle="tooltip"
                        title="In case of creating a token not for yourself, specify the address where you need to credit the tokens. If you are creating a token for yourself, leave the field blank."
                        className="col-12 col-xl-7">
                        <div className="token-name">Creator / Owner</div>
                        <input
                          value={creator}
                          onChange={(e) => setCreator(e.target.value)}
                          type="text"
                          placeholder="Not necessary"
                          style={{ marginTop: 20 }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12"
                  style={{ marginTop: 26 }}>
                  <div className="row">
                    <div className="col-12">
                      <div className="token-name" style={{ marginBottom: 14 }}>
                        Additional functions
                      </div>
                      <div className="settings">
                        <div
                          data-bs-toggle="tooltip"
                          title="This feature allows you to burn tokens to reduce the supply of tokens.">
                          <label className="switch-check">
                            <input
                              type="checkbox"
                              id="can-burn"
                              value={burn}
                              onChange={(e) => setBurn(e.target.checked)}
                            />
                            <span className="circle round"></span>
                          </label>
                          <label htmlFor="can-burn">
                            <div className="token-name">Is burn</div>
                          </label>
                        </div>
                        <div
                          data-bs-toggle="tooltip"
                          title="This feature allows you to print additional tokens to increase the initial supply.">
                          <label className="switch-check">
                            <input
                              type="checkbox"
                              id="can-write"
                              value={mint}
                              onChange={(e) => setMint(e.target.checked)}
                            />
                            <span className="circle round"></span>
                          </label>
                          <label htmlFor="can-write">
                            <div className="token-name">Is mint</div>
                          </label>
                        </div>
                        <div
                          data-bs-toggle="tooltip"
                          title="This check indicates if your token and all operations associated with it can
                                                  be stopped and restarted as needed. This suspend operation can
                                                  be used in the event of a software vulnerability or malicious attack.
                                                   Keep in mind that enabling suspend gives permission to any user who
                                                  who is allowed to pause or unpause, such as the creator
                                                  token, and this central authority may not be appropriate for certain use cases.">
                          <label className="switch-check">
                            <input
                              type="checkbox"
                              id="can-stop"
                              value={pause}
                              onChange={(e) => setPause(e.target.checked)}
                            />
                            <span className="circle round"></span>
                          </label>
                          <label htmlFor="can-stop">
                            <div className="token-name">Is paused</div>
                          </label>
                        </div>
                        <div
                          data-bs-toggle="tooltip"
                          title="Accounts can also be blacklisted,
                                                  if they act maliciously. Depending on the use case,
                                                   for some tokens, it may be better to disable this feature. Similar to the suspend function,
                                                   the inclusion of blacklists leads to the centralization of powers,
                                                    which may not be suitable for certain use cases.">
                          <label className="switch-check">
                            <input
                              type="checkbox"
                              id="black-list"
                              value={blacklist}
                              onChange={(e) => setBlacklist(e.target.checked)}
                            />
                            <span className="circle round"></span>
                          </label>
                          <label htmlFor="black-list">
                            <div className="token-name">Black list</div>
                          </label>
                        </div>
                        <div
                          data-bs-toggle="tooltip"
                          title="This feature allows you to levy taxes on each transaction and burn tokens.">
                          <label className="switch-check">
                            <input
                              id="deflation"
                              type="checkbox"
                              value={isDeflation}
                              onChange={(e) => {
                                showBlockDeflation(e);
                                setIsDeflation(e.target.checked);
                              }}
                            />
                            <span className="circle round"></span>
                          </label>
                          <label htmlFor="deflation">
                            <div className="token-name">Deflation</div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={deflation ? { display: 'block' } : { display: 'none' }}>
                  <div className="row">
                    <div className="col-xl-9 col-12">
                      <div className="row">
                        <div
                          data-bs-toggle="tooltip"
                          className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12 col-12"
                          title="Every transaction on the network will be taxed in %
                                                  the ratio you specify. Specify a value of 0 to disable the tax.
                                                  In the next window, specify the address where the tax will be received.">
                          <div className="token-name">Transaction Tax</div>
                          <CountTransactions
                            transactionTaxValue={transactionTaxValue}
                            setTransactionTaxValue={setTransactionTaxValue}
                          />
                        </div>
                        <div
                          data-bs-toggle="tooltip"
                          className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 col-12"
                          title="Transaction tax receipt address.
                                                  Please set the address you can control.
                                                   Note: This address will not be charged or burned.">
                          <div className="token-name">Tax collection address</div>
                          <TaxRecieveAddress
                            taxReceiveAddressValue={taxReceiveAddressValue}
                            setTaxRecieveAddressValue={setTaxRecieveAddressValue}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ marginBottom: 25 }}>
                    <div className="col-xl-9">
                      <div className="row">
                        <div
                          data-bs-toggle="tooltip"
                          className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12 col-12"
                          title="Each transaction will be subject to burning.
                                                  This feature will reduce the supply of tokens.
                                             Specify a value of 0 to disable burning.">
                          <div className="token-name">Burning</div>
                          <BurnFee burnFeeValue={burnFeeValue} setBurnFeeValue={setBurnFeeValue} />
                        </div>
                        <div
                          data-bs-toggle="tooltip"
                          className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 col-12"
                          title="This tax is used to reward token holders for holding - it is redistributed among the holders.">
                          <div className="token-name">Holder rewards</div>
                          <HoldersRewardFee
                            holdersRewardFeeValue={holdersRewardFeeValue}
                            setHoldersRewardFeeValue={setHoldersRewardFeeValue}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {deflation && (
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
                      <div className="info-block info">
                        <div>
                          You applied the deflation function,
                          {transactionTaxValue !== 0
                            ? `you have selected ${transactionTaxValue}% Transaction Tax,`
                            : ''}
                          {burnFeeValue !== 0 ? ` ${burnFeeValue}% burning,` : ''}
                          {holdersRewardFeeValue !== 0
                            ? ` ${holdersRewardFeeValue}% distribution among token holders. `
                            : ''}
                          By sending 100 tokens, in total the user will receive{' '}
                          {100 - transactionTaxValue - burnFeeValue - holdersRewardFeeValue} tokens.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {infoBlockFirst && (
                  <div className={`row ${infoBlockFirst ? 'open' : 'hide'}`}>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
                      <div className="info-block first">
                        <div>
                          All tokens have been audited by the company security and passed the
                          contract security audit!
                        </div>
                        <img src={Close} alt="close" onClick={handleCloseFirstInfoBlock} />
                      </div>
                    </div>
                  </div>
                )}

                {infoBlockSecond && (
                  <div className={`row ${infoBlockSecond ? 'open' : 'hide'}`}>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
                      <div className="info-block second" style={{ marginTop: 10 }}>
                        <div>
                          It only takes 10 seconds to successfully create, no manual intervention,
                          the token will be automatically transferred to the address of the creator
                          / owner after successful creation. The token has no copyright, it is
                          automatically being deployed to the mainnet and tested!
                        </div>
                        <img src={Close} alt="close" onClick={handleCloseSecondInfoBlock} />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            {checkLocationTron && (
              <div className="row" style={{ marginTop: 28 }}>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 col-12">
                  <div className="row">
                    <div
                      data-bs-toggle="tooltip"
                      title="The address where the created tokens will go"
                      className="col-12">
                      <div className="token-name">Admin address</div>
                      <div style={{ margin: '20px 0px 0px' }}>
                        <input type="text" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="col-12" style={{ marginTop: 26 }}>
              <div className="row">
                <button onClick={() => buyToken()} className={'card__btn token__btn'}>
                  Create token
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateToken;
