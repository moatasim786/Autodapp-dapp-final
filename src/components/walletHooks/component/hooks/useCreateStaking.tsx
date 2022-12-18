import React, {useCallback} from 'react'

import getStaking  from '../../../../utils/wallet/contracts/staking/getStaking'
import { useWeb3React } from '@web3-react/core'

const useCreateStaking = () => {
    console.log('staking', getStaking)
    const {account, library} = useWeb3React()
    console.log(library)
    const deployStaking = useCallback(async () => {
        
    },[])


    return deployStaking;
}

export default useCreateStaking