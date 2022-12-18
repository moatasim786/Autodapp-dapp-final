import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import AutoDappClassComponent from '../editor/Editor';
import {Contract} from '../'
import CreateToken from '../createToken/createToken';
import { DappPreference } from '../dappPreference';
import { loadLocal } from '../utils';

export const Dapp = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const [preference, setPreference] = useState(localStorage.getItem('preference_selected'))
    //
    const option = loadLocal('autodapp_user_option')
    const isToken = option?.find((o) => o.option === 'Token')
    const isContact = option?.find((o) => o.option === 'Dapp-contract')
    
    useEffect(() => {
        
        if (!isContact && !isToken &&  location.pathname === '/dapp-create-token') {
            console.log('dapp')
            navigate('/dapp-website')
        }

        if (isContact && !isToken && location.pathname === '/dapp-create-token') {
            navigate('/dapp-contract')
        }

        if (preference === 'Dapp') {
            navigate('/dapp-website')
        }
        
        if (preference === 'Token' && !isToken && isContact && location.pathname === '/dapp-create-token') {
            // console.log('contract')
            navigate('/dapp-contract')
        }

        if (!preference) {
            navigate('/dapp-create-token')
        }
    },[preference])
    
    return (
        <>
            {!preference && <DappPreference setPreference={setPreference}/>}
            {location.pathname === '/dapp-create-token' && preference === 'Token' && isToken && <CreateToken option="dapp"/>}
            {location.pathname === '/dapp-website' && <AutoDappClassComponent option="dapp"/>}
            {location.pathname === '/dapp-contract' &&  <Contract option="dapp"/>}
        </>
    )
}