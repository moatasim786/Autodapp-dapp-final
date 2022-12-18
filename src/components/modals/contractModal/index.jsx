import './modal.scss'

import React from 'react'
import { loadLocal } from '../../utils'
import { useNavigate } from 'react-router-dom';

const Modal = ({open, setOpen}) => {
    const navigate = useNavigate()
    const staking = loadLocal('autodapp_contact_staking')
    const token = loadLocal('autodapp_contact')

    const closeModal = () => {
        setOpen(false)
        navigate('/')
    }

    return (
        <div className={open ? "modal fade show_modal" : "modal fade"} id="content_modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <div className="mb-3">
                                <label htmlFor="token-contract" className="col-form-label">Token contract:</label>
                                <input type="text" readOnly className="form-control" id="token-contract" value={token}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="staking-contract" className="col-form-label">Staking contract:</label>
                                <input type="text" readOnly className="form-control" id="staking-contract" value={staking}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="token-contract" className="col-form-label">Link to token Abi: 
                                    <a href={`https://testnet.bscscan.com/address/${token}#code`} target='_blank'> Token Abi</a>
                                </label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="staking-contract" className="col-form-label">Link to Staking Abi: 
                                    <a href={`https://testnet.bscscan.com/address/${staking}#code`} target='_blank'> Staking Abi</a>
                                </label>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
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