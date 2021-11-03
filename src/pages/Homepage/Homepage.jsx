import React, {useEffect} from 'react'
import Header from '../../components/Header/Header'
import InvoicePreview from '../../components/InvoicePreview/InvoicePreview'
import { collection,query,where, getDocs } from "firebase/firestore";
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setInvoices } from '../../redux/userSlice'
const Homepage = () => {
    const currentUser = useSelector(state => state.user.user)
    const uid = useSelector(state => state.user.user.uid)
    const invoices = useSelector(state => state.user.invoices)
    const dispatch = useDispatch()
    const getData = async () =>{
        if(currentUser){
            const q = query(collection(db, "users"), where("uid", "==", uid));
            const docSnap = await getDocs(q);
            docSnap.forEach(snap => dispatch(setInvoices(snap.data().invoices)))
        }
    }
    useEffect(()=>{
        getData()
    },[currentUser])
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
