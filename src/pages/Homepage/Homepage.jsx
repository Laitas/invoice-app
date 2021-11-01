import React, {useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import InvoicePreview from '../../components/InvoicePreview/InvoicePreview'
import { collection,query,where, getDocs } from "firebase/firestore";
import { db } from '../../firebase';
import { useSelector } from 'react-redux';

const Homepage = () => {
    const [invoices,setInvoices] = useState([])
    const uid = useSelector(state => state.user.user.uid)
    const getData = async () =>{
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const docSnap = await getDocs(q);
        docSnap.forEach(snap => setInvoices(snap.data().invoices))
    }
    useEffect(()=>{
        getData()
    },[uid])
    return (
        <div>
            <Header/>
            {invoices?.map(invoice =>(
                <InvoicePreview key={invoice.id} invoice={invoice} />
            ))}
        </div>
    )
}

export default Homepage
