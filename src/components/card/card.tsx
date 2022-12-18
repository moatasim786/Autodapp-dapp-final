import './card.scss';

import React, { FC } from 'react';

import { Button } from '..';
import { loadLocal } from '../utils';
import { routes } from '../../routes';
import { setCard } from '../../redux/reducer/cardReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface cardProps {
  data: {
    name: 'Token/Contract' | 'Website' | 'Dapp';
    price: number;
    image: string;
  };
  price: string;
  activeCard: {
    name: string;
  };
  setActiveCard: (name: any) => void;
  setShowBtn: (name: any) => void;
}

export const Card: FC<cardProps> = ({ data, price, setActiveCard, activeCard, setShowBtn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const options = loadLocal('autodapp_user_option');
  //
  const currentOption = options?.find((o: any) => o?.option === data?.name);
  const contract = options?.find((o: any) => o?.option === 'Contract' && data?.name === 'Token/Contract');
  const templateOption = options?.find((o: any) => o?.option === 'Template' && data?.name === "Website");
  const option = templateOption || currentOption || contract
  const rout = templateOption ? templateOption.option as 'Template' : data?.name
  
  const handleClick = () => {
    dispatch(setCard(data?.price));
    setActiveCard(data);
    setShowBtn(currentOption)
  };

  return (
    <div
      onClick={handleClick}
      className={data?.name === activeCard?.name ? 'cardItem cardItem__active' : 'cardItem'}>
      <div>
        <img src={data?.image} alt="" />
        {option && (
          <div className="cardLaunch">
            <Button click={() => navigate(routes[rout])} className="card__btn_launch">
              Launch
            </Button>
          </div>
        )}
      </div>
      <h4>{data?.name}</h4>
      <p>({price})</p>
    </div>
  );
};
