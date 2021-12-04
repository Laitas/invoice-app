import React from 'react'
import Button from '../Button/Button'
import './DeleteModal.scss'
const DeleteModal = ({id, toggleModal,deleteDocument}) => {
    return (
        <div className="modal-wrapper">
            <div className="modal-overlay"></div>
            <div className="modal-itself">
                <h2>Confirm Deletion</h2>
                <p>Are you sure you wnat to delete #{id}? This action cannot be undone.</p>
                <div className="buttons">
                <Button v={2} onClick={()=> toggleModal(false)} text="Cancel" />
                <Button v={4} onClick={deleteDocument} text="Delete" />
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
