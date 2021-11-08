import React, {useEffect} from 'react'
import Header from '../../components/Header/Header'
import InvoicePreview from '../../components/InvoicePreview/InvoicePreview'
import { collection,query,where, getDocs } from "firebase/firestore";
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setInvoices } from '../../redux/userSlice'
import { ReactComponent as Empty } from '../../assets/illustration-empty.svg'
import './Homepage.scss'
import NewInvoice from '../../components/NewInvoice/NewInvoice';
const Homepage = () => {
    const uid = useSelector(state => state.user.user.uid)
    const invoices = useSelector(state => state.user.invoices)
  const toggleNewInvoice = useSelector((state) => state.user.toggleNewInvoice);
    const dispatch = useDispatch()
    const getData = async () =>{
        if(uid){
            const q = query(collection(db, "users"), where("uid", "==", uid));
            const docSnap = await getDocs(q);
            docSnap.forEach(snap => dispatch(setInvoices(snap.data().invoices)))
        }
    }
    useEffect(()=>{
        getData()
    },[uid])
    return (
        <div>
            {toggleNewInvoice && <NewInvoice/>}
            <Header/>
            {invoices.length <= 0 ? 
            <div className="empty-list" >
                <Empty />
                <h2>There is nothing here</h2>
                <p>Create an invoice by clicking the <br />
                
                    <span>New Invoice</span> button and get started</p>
            </div> 
            :
            invoices?.map(invoice =>(
                <InvoicePreview key={invoice.id} invoice={invoice} />
                ))
            }
        </div>
    )
}

export default Homepage
