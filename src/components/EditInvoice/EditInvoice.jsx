import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CalendarComponent from "../CalendarComponent/CalendarComponent";
import Dropdown from "../Dropdown/Dropdown";
import { v4 as uuidv4 } from "uuid";
import "./EditInvoice.scss";
import Button from "../Button/Button";
import { ReactComponent as IconRemove } from "../../assets/icon-delete.svg";
import {
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { toggleEdit, setInvoices } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { db } from "../../firebase";
import { useHistory } from "react-router-dom";
const EditInvoice = ({ invoice }) => {
  const toggleEditInvoice = useSelector(
    (state) => state.user.toggleEditInvoice
  );
  const key = useSelector((state) => state.user.user.key);
  const uid = useSelector((state) => state.user.user.uid);
  const createdAtSelector = useSelector((state) => state.form.createdAt);
  const paymentTermsSelector = useSelector((state) => state.form.paymentTerms);
  const paymentDueSelector = useSelector((state) => state.form.paymentDue);
  const history = useHistory();
  const dispatch = useDispatch();
  const [formInputs, setFormInputs] = useState([]);
  const [form, setForm] = useState({
    clientCity: invoice.clientAddress.city,
    clientCountry: invoice.clientAddress.country,
    clientPostCode: invoice.clientAddress.postCode,
    clientStreet: invoice.clientAddress.street,
    clientEmail: invoice.clientEmail,
    clientName: invoice.clientName,
    createdAt: invoice.createdAt,
    description: invoice.description,
    id: invoice.id,
    items: formInputs,
    paymentDue: invoice.paymentDue,
    paymentTerms: invoice.paymentTerms,
    senderCity: invoice.senderAddress.city,
    senderCountry: invoice.senderAddress.country,
    senderPostCode: invoice.senderAddress.postCode,
    senderStreet: invoice.senderAddress.street,
    status: invoice.status,
    total: invoice.total,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "users", key), {
      invoices: arrayUnion({
        clientAddress: {
          city: form.clientCity,
          country: form.clientCountry,
          postCode: form.clientPostCode,
          street: form.clientStreet,
        },
        clientEmail: form.clientEmail,
        clientName: form.clientName,
        createdAt: form.createdAt,
        description: form.description,
        id: form.id,
        items: form.items,
        paymentDue: form.paymentDue,
        paymentTerms: form.paymentTerms,
        senderAddress: {
          city: form.senderCity,
          country: form.senderCountry,
          postCode: form.senderPostCode,
          street: form.senderStreet,
        },
        status: form.status,
        total: form.total,
      }),
    });
    discard();
    // Remove the copy from before
    await updateDoc(doc(db, "users", key), {
      invoices: arrayRemove(invoice),
    });
    // Copied function from Homepage.jsx because I don't know how else I can use
    // Same function on multiple pages, pls halp.
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const docSnap = await getDocs(q);
    docSnap.forEach((snap) => dispatch(setInvoices(snap.data().invoices)));
    history.go(0);
  };

  const discard = () => {
    dispatch(toggleEdit());
    setFormInputs([]);
    invoice.items.map((item) =>
      setFormInputs((prevState) => [
        ...prevState,
        {
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.total,
        },
      ])
    );
    setForm({
      clientCity: invoice.clientAddress.city,
      clientCountry: invoice.clientAddress.country,
      clientPostCode: invoice.clientAddress.postCode,
      clientStreet: invoice.clientAddress.street,
      clientEmail: invoice.clientEmail,
      clientName: invoice.clientName,
      createdAt: invoice.createdAt,
      description: invoice.description,
      id: invoice.id,
      items: formInputs,
      paymentDue: invoice.paymentDue,
      paymentTerms: invoice.paymentTerms,
      senderCity: invoice.senderAddress.city,
      senderCountry: invoice.senderAddress.country,
      senderPostCode: invoice.senderAddress.postCode,
      senderStreet: invoice.senderAddress.street,
      status: invoice.status,
      total: invoice.total,
    });
  };
  const handleItemChange = (index, e) => {
    let values = [...formInputs];
    values[index][e.target.name] = e.target.value;
    values[index].total = (
      values[index].price * values[index].quantity
    ).toFixed(2);
    setFormInputs(values);
  };
  const removeItem = (index) => {
    const values = [...formInputs];
    values.splice(index, 1);
    setFormInputs(values);
  };

  useEffect(() => {
    setForm((prevState) => ({
      ...prevState,
      paymentDue: `${paymentDueSelector.year}-${paymentDueSelector.month}-${paymentDueSelector.day}`,
    }));
    setForm((prevState) => ({
      ...prevState,
      paymentTerms: paymentTermsSelector,
    }));
    // I'm not sure why it's out of sync, I had to include form.paymentTerms as a dependecy
  }, [form.paymentTerms,createdAtSelector, paymentTermsSelector]);
  useEffect(() => {
    setForm((prevState) => ({ ...prevState, items: formInputs }));
    const sumOfTotal = formInputs.reduce(
      (sum, curr) => sum + parseFloat(curr.total),
      0
    );
    setForm((prevState) => ({ ...prevState, total: sumOfTotal.toFixed(2) }));
  }, [formInputs]);

  // For some reason if I setFormInputs as [...invoice.items] I get TypeError Object.Key is read-only
  useEffect(() => {
    invoice.items.map((item) =>
      setFormInputs((prevState) => [
        ...prevState,
        {
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.total,
        },
      ])
    );
  }, []);
  return (
    <div
      className={
        toggleEditInvoice
          ? "edit-invoice edit-invoice--show"
          : "edit-invoice edit-invoice--hide"
      }
    >
      <h2>Edit #{invoice.id}</h2>

      {/* BILL FROM  */}
      <form onSubmit={handleSubmit}>
        <section className="bill-from">
          <h4>Bill From</h4>
          <div className="input">
            <label htmlFor="senderStreet">Street Address</label>
            <input
              required
              type="text"
              name="senderStreet"
              id="senderStreet"
              value={form.senderStreet}
              onChange={handleChange}
            />
          </div>
          <div className="multiple-inputs">
            <div className="input">
              <label htmlFor="senderCity">City</label>
              <input
                required
                type="text"
                name="senderCity"
                id="senderCity"
                value={form.senderCity}
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="senderPostCode">Post Code</label>
              <input
                required
                type="text"
                name="senderPostCode"
                id="senderPostCode"
                value={form.senderPostCode}
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="senderCountry">Country</label>
              <input
                required
                type="text"
                name="senderCountry"
                id="senderCountry"
                value={form.senderCountry}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* BILL TO  */}
        <section className="bill-to">
          <h4>Bill To</h4>
          <div className="input">
            <label htmlFor="clientName">Client's Name</label>
            <input
              required
              type="text"
              name="clientName"
              id="clientName"
              value={form.clientName}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label htmlFor="clientEmail">Client's Email</label>
            <input
              required
              type="email"
              name="clientEmail"
              id="clientEmail"
              value={form.clientEmail}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label htmlFor="clientStreet">Street Address</label>
            <input
              required
              type="text"
              name="clientStreet"
              id="clientStreet"
              value={form.clientStreet}
              onChange={handleChange}
            />
          </div>
          <div className="multiple-inputs">
            <div className="input">
              <label htmlFor="clientCity">City</label>
              <input
                required
                type="text"
                name="clientCity"
                id="clientCity"
                value={form.clientCity}
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="clientPostCode">Post Code</label>
              <input
                required
                type="text"
                name="clientPostCode"
                id="clientPostCode"
                value={form.clientPostCode}
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="clientCountry">Country</label>
              <input
                required
                type="text"
                name="clientCountry"
                id="clientCountry"
                value={form.clientCountry}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="date-inputs">
            <div className="input">
              <span className="label">Invoice Date</span>
              <CalendarComponent />
            </div>
            <div className="input">
              <span className="label">Payment Terms</span>
              <Dropdown />
            </div>
          </div>
          <div className="input">
            <label htmlFor="description">Project Description</label>
            <input
              required
              type="text"
              name="description"
              id="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* ITEM LIST  */}
        <section className="item-list">
          <span className="item-list--heading">Item List</span>
          <table className="item-list--items">
            <tbody>
            <tr>
              <th className="label">Item name</th>
              <th className="label">Qty.</th>
              <th className="label">Price</th>
              <th className="label">Total</th>
              <th className="label hidden">Remove</th>
            </tr>
            {form.items.map((input, index) => (
              <tr key={index}>
                <td className="big">
                  <input
                    required
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={(e) => handleItemChange(index, e)}
                    />
                </td>
                <td className="small centered">
                  <input
                    required
                    type="number"
                    value={input.quantity}
                    name="quantity"
                    onChange={(e) => handleItemChange(index, e)}
                    />
                </td>
                <td className="medium">
                  <input
                    required
                    type="number"
                    value={input.price}
                    name="price"
                    onChange={(e) => handleItemChange(index, e)}
                    />
                </td>
                <td>${input.total}</td>
                <td>
                  <IconRemove onClick={() => removeItem(index)} />
                </td>
              </tr>
            ))}
            </tbody>
          </table>
          <div className="button">
            <Button
              onClick={() =>
                setFormInputs((prevState) => [
                  ...prevState,
                  { id: uuidv4(), name: "", quantity: 0, price: 0, total: 0 },
                ])
              }
              v={2}
              text="+ Add New Item"
            />
          </div>
        </section>
        <div className="buttons">
          <Button onClick={() => discard()} v={2} text="Cancel" />
          <Button
            type={"submit"}
            onClick={handleSubmit}
            onSubmit={(e) => handleSubmit(e)}
            text="Save Changes"
          />
        </div>
      </form>
    </div>
  );
};

export default EditInvoice;
