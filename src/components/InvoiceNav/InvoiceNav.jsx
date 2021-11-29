import React from "react";
import Status from "../Status/Status";
import Button from "../Button/Button";
import { doc, updateDoc, arrayRemove, arrayUnion, query,collection,where,getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setInvoices } from "../../redux/userSlice";
import "./InvoiceNav.scss";

const InvoiceNav = ({ invoice }) => {
  const key = useSelector((state) => state.user.user.key);
  const uid = useSelector((state) => state.user.user.uid);
  const history = useHistory();
  const dispatch = useDispatch()
  const deleteDocument = async () => {
    await updateDoc(doc(db, "users", key), {
      invoices: arrayRemove(invoice),
    });
    history.push("/");
  };
  const markAsPaid = async () => {
    // Updates invoice status, at the same time creates identical copy of previous file
    // except for status
    await updateDoc(doc(db, "users", key), {
        invoices: arrayUnion({...invoice, status : 'paid'}),
      });
    // Remove the copy from before
    await updateDoc(doc(db, "users", key), {
        invoices: arrayRemove(invoice),
      });
    // Copied function from Homepage.jsx because I don't know how else I can use
    // Same function on multiple pages, pls halp.
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const docSnap = await getDocs(q);
      docSnap.forEach(snap => dispatch(setInvoices(snap.data().invoices)))
      history.go(0)
  };

  return (
    <nav className="invoice-nav">
      <div className="invoice-nav--status">
        <span>Status</span>
        <Status status={invoice?.status} />
      </div>
      <div className="invoice-nav--buttons">
        <Button v={2} text="Edit" />
        <Button v={4} onClick={() => deleteDocument()} text="Delete" />
        {invoice.status !== 'paid' &&
        <Button onClick={()=> markAsPaid()} text="Mark as Paid" />
        }
      </div>
    </nav>
  );
};

export default InvoiceNav;
