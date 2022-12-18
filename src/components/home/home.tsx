// @ts-nocheck

import './home.scss';

import { Button, Card, Header, Warning } from '..';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { bnbAxios, croAxios } from '../axios';

import { cardApi } from '../mokApi';
import cardReducer from '../../redux/reducer/cardReducer';
import { useBtnConnect } from '../walletHooks/component/hooks/useBtnConnect';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSendTransaction } from '../walletHooks/component/hooks/useSendTransaction';
import { useWeb3React } from '@web3-react/core';

export const Home = () => {
  const { account, chainId, balance } = useWeb3React();
  const mobileCard = window.innerWidth < 992;

  const { setTransaction } = useSendTransaction();

  const [isAvatar, setIsAvatar] = useState(false);
  const [isClearTemplate, setIsClearTemplate] = useState(false);
  const [isDefaultTemplate, setIsDefaultTemplate] = useState(false);
  const [activeCard, setActiveCard] = useState();
  const [priceCro, setPriceCro] = useState();
  const [showBtn, setShowBtn] = useState();

  useEffect(() => {
    croAxios({ setPriceCro });
  }, [setPriceCro]);

  const transaction = () => {
    const actualPrice = [338, 1].includes(chainId)
      ? (activeCard?.price / Number(priceCro)).toFixed(5)
      : activeCard?.price;

    if (isClearTemplate === false && isDefaultTemplate === false && activeCard.name === 'Website') {
      return toast.error('Please choose Website or Dapp template!');
    }

    if (!account) {
      return toast.error('Connect your Wallet!');
    }

    if (balance < activeCard?.price * 10 ** 18) {
      return toast.error('Insufficient Balance');
    }

    return setTransaction(
      actualPrice,
      isClearTemplate ? 'Website' : isDefaultTemplate ? 'Template' : activeCard.name,
    );
  };

  const renderCards = cardApi?.map((card) => {
    if ((mobileCard && card.id === 1) || (mobileCard && card.id === 3)) return null;
    return (
      <div key={card.id} className="col-lg-4 col-sm-12">
        <Card
          data={card}
          price={
            [338, 1].includes(chainId)
              ? `${(card?.price / Number(priceCro)).toFixed(5)} ETH`
              : `${card?.price} BNB`
          }
          setActiveCard={setActiveCard}
          activeCard={activeCard}
          setShowBtn={setShowBtn}
        />
      </div>
    );
  });

  const renderChooseOption = () => {
    return (
      <div className="choose_option">
        <input
          type="checkbox"
          checked={isClearTemplate}
          onChange={() => {
            setIsDefaultTemplate(false);
            setIsClearTemplate((prev) => !prev);
          }}
        />
        Website
        <input
          type="checkbox"
          checked={isDefaultTemplate}
          onChange={() => {
            setIsClearTemplate(false);
            setIsDefaultTemplate((prev) => !prev);
          }}
        />
        Dapp template
      </div>
    );
  };

  const renderBuyButton = () => {
    return (
      <button onClick={() => transaction()} className={'card__btn'}>
        {[338, 1].includes(chainId)
          ? `Pay ${(activeCard?.price / Number(priceCro)).toFixed(2)} ETH`
          : `Pay ${activeCard?.price} BNB`}
      </button>
    );
  };

  return (
    <div className="home" onClick={() => setIsAvatar(false)}>
      <div className="container">
        {/* <Header openAva={isAvatar} setOpenAva={setIsAvatar} /> */}
        <h1 className="home__title text-center">Choose the product you want to build!</h1>
        <div className="home__content">
          <div className="row">{renderCards}</div>
          {!showBtn ? (activeCard?.name === 'Website' ? renderChooseOption() : null) : null}
          {activeCard && renderBuyButton() && !showBtn && renderBuyButton()}
        </div>
      </div>
    </div>
  );
};

// import { Button, Card, Header, Warning } from '..';
// import React, { useEffect, useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import { bnbAxios, croAxios } from '../axios';

// import { cardApi } from '../mokApi';
// import { useBtnConnect } from '../walletHooks/component/hooks/useBtnConnect';
// import { useSelector } from 'react-redux';
// import { useSendTransaction } from '../walletHooks/component/hooks/useSendTransaction';
// import { useWeb3React } from '@web3-react/core';

// export const Home = () => {
//   const { balance, account } = useBtnConnect();
//   const setTransaction = useSendTransaction();
//   const { chainId } = useWeb3React();

//   const [openAva, setOpenAva] = useState(false);
//   const [activeBtn, setActiveBtn] = useState(null);

//   const [activeCard, setActiveCard] = useState(null);
//   const itemsPrice = useSelector((state: { cardItem: any }) => state.cardItem);
//   const [payBalance, setPayBalance] = useState(false);
//   const [payBalanceBtn, setPayBalanceBtn] = useState(false);
//   const [activeBalanceBtn, setActiveBalanceBtn] = useState(false);
//   const [transactionBtn, setTransactionBtn] = useState(false);
//   const [isClearTemplate, setIsClearTemplate] = useState(false);
//   const [isDefaultTemplate, setIsDefaultTemplate] = useState(false);

//   const [payBnb, setPayBnb] = useState([]);
//   const [payCro, setPayCro] = useState([]);

//   const transaction = (price: number) => {
//     setTransactionBtn(!transactionBtn);
//     if (account) {
//       if (balance < price * 10 ** 18) {
//         setPayBalance(false);
//         toast.error('Insufficient Balance');
//       } else {
//         setTransaction.setTransaction(price, activeCard);
//         setPayBalanceBtn(!payBalanceBtn);
//         setPayBalance(!payBalance);
//         // toast.success('Payment Success');
//       }
//     } else {
//       setActiveBalanceBtn(!activeBalanceBtn);
//       toast.error('Please Choose network!');
//     }
//   };

//   useEffect(() => {
//     croAxios({ setPayCro });
//     bnbAxios({ setPayBnb });
//   }, [setPayCro, setPayBnb, isClearTemplate, isDefaultTemplate]);

//   const priceCro = itemsPrice / Number(payCro);

//   console.log({ isClearTemplate, isDefaultTemplate });

//   const renderChooseOption = () => {
//   console.log({isDefaultTemplate});
//   console.log({isClearTemplate});

//     return (
//       <div className='choose_option'>
//         <input
//           type='checkbox' value={isClearTemplate}
//           onClick={() => {
//             setIsDefaultTemplate(false);
//             setIsClearTemplate(prev => !prev);
//           }} />
//         Website
//         <input
//           type='checkbox' value={isDefaultTemplate}
//           onClick={() => {
//             setIsClearTemplate(false);
//             setIsDefaultTemplate(prev => !prev);
//           }} />
//         Dapp template
//       </div>
//     )
//   }

//   return (
//     <div className="home" onClick={() => setOpenAva(false)}>
//       <div className="container">
//         <Header openAva={openAva} setOpenAva={setOpenAva} />
//         <h1 className="home__title text-center">Choose the product you want to build!</h1>
//         <div className="home__content">
//           <div className="row">
//             {cardApi.map((cards) => (
//               <div key={cards.id} className="col-md-4 col-sm-6 col-12">
//                 <Card
//                   id={cards.id}
//                   name={cards.name}
//                   image={cards.image}
//                   price={cards.price}
//                   active={cards.active}
//                   setActiveBtn={setActiveBtn}
//                   setActiveCard={setActiveCard}
//                   activeCard={activeCard}
//                 />
//               </div>
//             ))}
//           </div>
//           {
//             account && itemsPrice === 0.2 ? renderChooseOption() : null
//           }
//           {account ? (
//             chainId && [338, 25].includes(chainId) ? (
//               itemsPrice ? (
//                 <Button
//                   click={activeBtn ? () => transaction(priceCro.toFixed(5)) : () => ''}
//                   className={activeBtn ? 'card__btn' : 'card__btn card__btn-none'}>
//                   {activeBtn ? `Pay ${priceCro.toFixed(5)} CRO` : 'Coming Soon!'}
//                 </Button>
//               ) : null
//             ) : chainId && [56, 97].includes(chainId) ? (
//               itemsPrice ? (
//                 <Button
//                   click={activeBtn ? () => transaction(itemsPrice) : () => ''}
//                   className={activeBtn ? 'card__btn' : 'card__btn card__btn-none'}>
//                   {activeBtn ? `Pay ${itemsPrice} BNB` : 'Coming Soon!'}
//                 </Button>
//               ) : null
//             ) : null
//           ) : itemsPrice ? (
//             <Button
//               click={activeBtn ? () => transaction(payBnb) : () => ''}
//               className={activeBtn ? 'card__btn' : 'card__btn card__btn-none'}>
//               {activeBtn ? `Pay ${itemsPrice} BNB` : 'Coming Soon!'}
//             </Button>
//           ) : null}
//         </div>
//       </div>
//       {/* <Warning
//         payBalance={payBalance}
//         payBalanceBtn={payBalanceBtn}
//         activeBalanceBtn={activeBalanceBtn}
//         transactionBtn={transactionBtn}
//       /> */}
//       {/* <ToastContainer
//         autoClose={3000}
//         position="top-right"
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       /> */}
//     </div>
//   );
// };
