import './index.scss'

import React, {useState} from 'react'

import { Header } from '..'

export const DappPreference = ({setPreference}) => {
    const [isAvatar, setIsAvatar] = useState(false);
    return (
        <div className="preference">
            <div className="globe"></div>
            <div className="container">
                {/* <Header openAva={isAvatar} setOpenAva={setIsAvatar} /> */}
            </div>
            <h3>What’s your preference?</h3>
            <div className="button__wrapper">
                <button className="preference__button" onClick={() => {
                    setPreference('Token')
                    localStorage.setItem('preference_selected', 'Token')
                }}
                >
                    Let me create the Token and Staking Contracts first!
                </button>
                <button className="preference__button" onClick={() => {
                    setPreference('Dapp')
                    localStorage.setItem('preference_selected', 'Dapp')
                }}>
                    I have the contracts, take me to the Dapp Builder!
                </button>
            </div>
        </div>
    )
    }