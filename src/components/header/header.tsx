import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../image/logo.svg';
import { ConnectButton } from '../walletHooks/component/ButtonConnect/connectButton';

import './header.scss';

interface headerProps {
  setOpenAva: any;
  openAva: any;
}

const RPC = {
  1: 'https://mainnet.infura.io/v3/8ca77c4631f14dccb88318200cfca61d',
  3: 'https://ropsten.infura.io/v3/8ca77c4631f14dccb88318200cfca61d',
  4: 'https://rinkeby.infura.io/v3/8ca77c4631f14dccb88318200cfca61d',
  5: 'https://goerly.infura.io/v3/8ca77c4631f14dccb88318200cfca61d',
  42: 'https://kovan.infura.io/v3/8ca77c4631f14dccb88318200cfca61d',
};

export const Header: FC<headerProps> = ({ setOpenAva, openAva }) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <header className="header pt-3 d-flex align-items-center justify-content-between">
      <img src={Logo} alt="" />
      <nav
        className={
          openMenu
            ? 'header__nav align-items-center justify-content-between block'
            : 'header__nav align-items-center justify-content-between'
        }>
        {/* <ul className="header__list d-flex align-items-center justify-content-between">
          <li>
            <NavLink to="/" className="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/creation">Creation</NavLink>
          </li>
          <li>
            <NavLink to="/instruction">Instruction</NavLink>
          </li>
          <li>
            <NavLink to="/roadmap">Roadmap</NavLink>
          </li>
          <li>
            <NavLink to="/whitepaper">Whitepaper</NavLink>
          </li>
        </ul> */}
        <ul>
          <li onClick={(e) => e.stopPropagation()}>
            <div className="ava" onClick={() => setOpenAva(!openAva)}>
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 256 256"
                id="Flat"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M231.94238,219.98975a8.00114,8.00114,0,0,1-6.93017,4.00293l-194.02295-.002a7.99981,7.99981,0,0,1-6.92432-12.00635,120.48813,120.48813,0,0,1,67.11865-54.14062,71.99995,71.99995,0,1,1,73.63294,0,120.48718,120.48718,0,0,1,67.12,54.14258A8.001,8.001,0,0,1,231.94238,219.98975Z" />
              </svg>
              <div className={openAva ? 'ava__dropdown' : 'none ava__dropdown-mobile'}>
                <NavLink to="/profile">Profile</NavLink>
                <a href="/" onClick={() => localStorage.removeItem('token')}>
                  LogOut
                </a>
              </div>
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <ConnectButton RPC={RPC} portisId={'portisId-key-project'} />
          </li>
        </ul>
      </nav>
      <div
        onClick={() => setOpenMenu(!openMenu)}
        className={openMenu ? 'header__menu-burger remove' : 'header__menu-burger'}></div>
    </header>
  );
};
