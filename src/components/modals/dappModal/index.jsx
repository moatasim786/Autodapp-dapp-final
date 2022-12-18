import './modal.scss'

import React, {useState} from 'react'
import { loadLocal, saveLocal } from '../../utils'

import { toast } from 'react-toastify';

const Modal = ({open, setOpen}) => {
    const [form, setForm] = useState({
        contract: loadLocal('autodapp_contact') || '',
        stakingContract: loadLocal('autodapp_contact_staking') || '',
        abi: localStorage.getItem('autodapp_abi') || '',
        stakingAbi: localStorage.getItem('autodapp_staking_abi') || ''
    })
    const closeModal = () => {
        setOpen()
    }
   
    const saveFields = () => {
        if (!form.contract || !form.stakingAbi || !form.stakingContract || !form.abi) {
            toast.error('you need to fill all fields')
        } else {
            saveLocal('autodapp_contact', form.contract)
            saveLocal('autodapp_contact_staking', form.stakingContract)
            localStorage.setItem('autodapp_abi', form.abi)
            localStorage.setItem('autodapp_staking_abi', form.stakingAbi)
            toast.success('Saved successfully');
            setOpen()
        }
    }

    return (
        <div className={open ? "modal fade show_modal" : "modal fade"} id="dapp_modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Your Contracts</h5>
                        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"
                            onClick={closeModal}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-2">
                                <label htmlFor="dapp-token-contract" className="col-form-label">Token contract:</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="dapp-token-contract" 
                                    value={form.contract}
                                    onChange={(e) => setForm({...form, contract: e.currentTarget.value})}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="dapp-staking-contract" className="col-form-label">Staking contract:</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="dapp-staking-contract" 
                                    value={form.stakingContract}
                                    onChange={(e) => setForm({...form, stakingContract: e.currentTarget.value})}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="token-abi" className="col-form-label">Token abi:</label>
                                <textarea 
                                    className="form-control" 
                                    id="token-abi" 
                                    value={form.abi}
                                    onChange={(e) => setForm({...form, abi: e.currentTarget.value})}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="staking-abi" className="col-form-label">Staking abi:</label>
                                <textarea  
                                    className="form-control" 
                                    id="staking-abi" 
                                    value={form.stakingAbi}
                                    onChange={(e) => setForm({...form, stakingAbi: e.currentTarget.value})}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" id="btn" className="btn btn-secondary" data-mdb-dismiss="modal"
                            onClick={saveFields}
                        >Save</button>
                        <button type="button" id="btn" className="btn btn-secondary" data-mdb-dismiss="modal"
                            onClick={closeModal}
                        >Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal