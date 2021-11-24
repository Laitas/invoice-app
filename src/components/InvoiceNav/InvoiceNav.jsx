import React from 'react'
import Status from '../Status/Status';
import Button from '../Button/Button'
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import {db} from '../../firebase'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import './InvoiceNav.scss'

const InvoiceNav = ({invoice}) => {
    const key = useSelector(state => state.user.user.key)
    const history = useHistory()
    const deleteDocument = async () =>{
        await updateDoc(doc(db, 'users', key ), {
            invoices : arrayRemove(invoice)
        });
        history.push('/')
    }
    return (
        <nav className="invoice-nav">
            <div className="invoice-nav--status">
                <span>Status</span>
                <Status status={invoice?.status} />
            </div>
            <div className="invoice-nav--buttons">
                <Button v={2} text='Edit' />
                <Button v={4} onClick={() => deleteDocument()} text='Delete' />
                <Button text='Mark as Paid' />
            </div>
        </nav>
    )
}

export default InvoiceNav
