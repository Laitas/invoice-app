import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import CalendarComponent from "../CalendarComponent/CalendarComponent";
import Dropdown from "../Dropdown/Dropdown";
import { v4 as uuidv4 } from "uuid";
import "./NewInvoice.scss";
import Button from "../Button/Button";
import { ReactComponent as IconRemove } from "../../assets/icon-delete.svg";
import { toggleNew, setInvoices } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { setPaymentTerms } from "../../redux/formSlice";
import {
  doc,
  updateDoc,
  arrayUnion,
  query,
  collection,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useHistory } from "react-router-dom";
import useWindowWidth from "../../hooks/useWindowWidth";
import useFormValidation from "../../hooks/useFormValidation";
const NewInvoice = () => {
  const toggleNewInvoice = useSelector((state) => state.user.toggleNewInvoice);
  const key = useSelector((state) => state.user.user.key);
  const uid = useSelector((state) => state.user.user.uid);
  const createdAtSelector = useSelector((state) => state.form.createdAt);
  const paymentTermsSelector = useSelector((state) => state.form.paymentTerms);
  const paymentDueSelector = useSelector((state) => state.form.paymentDue);
  const invoiceRef = useRef(0);
  const history = useHistory();
  const dispatch = useDispatch();
  const [formInputs, setFormInputs] = useState([
    { id: uuidv4(), name: "", quantity: "", price: "", total: 0 },
  ]);
  const [width] = useWindowWidth();

  const getID = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    let result = "";
    for (let i = 0; i < 2; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let j = 0; j < 4; j++) {
      result += nums.charAt(Math.floor(Math.random() * nums.length));
    }
    return result;
  };

  const [form, setForm] = useState({
    clientCity: "",
    clientCountry: "",
    clientPostCode: "",
    clientStreet: "",
    clientEmail: "",
    clientName: "",
    createdAt: "",
    description: "",
    id: getID(),
    items: [],
    paymentDue: "",
    paymentTerms: 1,
    senderCity: "",
    senderCountry: "",
    senderPostCode: "",
    senderStreet: "",
    status: "",
    total: 0,
  });

  const checkSubmitButton = (e) => {
    if (e.target.innerText === "Save & Send") {
      setForm((prevState) => ({ ...prevState, status: "pending" }));
    } else if (e.target.innerText === "Save as Draft") {
      setForm((prevState) => ({ ...prevState, status: "draft" }));
    }
  };
  const handleSubmit = async () => {
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
    // It takes time to update Firebase (I GUESS?????idk)
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const docSnap = await getDocs(q);
    docSnap.forEach((snap) => dispatch(setInvoices(snap.data().invoices)));
    setTimeout(() => {
      history.push(`invoices/${form.id}`);
    }, 1000);
  };

  const discard = () => {
    setForm({
      clientCity: "",
      clientCountry: "",
      clientPostCode: "",
      clientStreet: "",
      clientEmail: "",
      clientName: "",
      createdAt: "",
      description: "",
      id: getID(),
      items: [],
      paymentDue: "",
      paymentTerms: 1,
      senderCity: "",
      senderCountry: "",
      senderPostCode: "",
      senderStreet: "",
      status: "",
      total: 0,
    });
    setFormInputs([
      { id: uuidv4(), name: "", quantity: "", price: "", total: 0.0 },
    ]);
    dispatch(setPaymentTerms(1));
    dispatch(toggleNew());
  };
  const handleItemChange = (index, e) => {
    const values = [...formInputs];
    values[index][e.target.name] = e.target.value;
    values[index].total = (
      values[index].price * values[index].quantity
    ).toFixed(2);
    setFormInputs(values);
  };
  const removeItem = (index) => {
    const values = [...formInputs];
    if (values.length <= 1) {
      setFormInputs([
        { id: uuidv4(), name: "", quantity: "", price: "", total: 0.0 },
      ]);
    } else {
      values.splice(index, 1);
      setFormInputs(values);
    }
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
  }, [
    form.paymentTerms,
    createdAtSelector,
    paymentTermsSelector,
    paymentDueSelector.year,
    paymentDueSelector.month,
    paymentDueSelector.day,
  ]);
  useEffect(() => {
    setForm((prevState) => ({
      ...prevState,
      createdAt: `${createdAtSelector.year}-${createdAtSelector.month}-${createdAtSelector.day}`,
    }));
  }, [createdAtSelector]);
  useEffect(() => {
    setForm((prevState) => ({ ...prevState, items: formInputs }));
    const sumOfTotal = formInputs.reduce(
      (sum, curr) => sum + parseFloat(curr.total),
      0
    );
    setForm((prevState) => ({ ...prevState, total: sumOfTotal.toFixed(2) }));
  }, [formInputs]);

  //VALIDATION
  const { preHandleSubmit, errors, handleChange } = useFormValidation(
    form,
    setForm,
    handleSubmit,
    formInputs,
    setFormInputs
  );
  return (
    <div
      ref={invoiceRef}
      className={
        toggleNewInvoice
          ? "new-invoice new-invoice--show"
          : "new-invoice new-invoice--hide"
      }
    >
      <h2>New Invoice</h2>

      {/* BILL FROM  */}
      <form onSubmit={preHandleSubmit}>
        <section className="bill-from">
          <h4>Bill From</h4>
          <div className="input">
            <label htmlFor="senderStreet">Street Address</label>
            <input
              className={errors.senderStreet && "invalid"}
              type="text"
              name="senderStreet"
              id="senderStreet"
              onChange={handleChange}
            />
          </div>
          <div className="multiple-inputs">
            <div className="input">
              <label htmlFor="senderCity">City</label>
              <input
                className={errors.senderCity && "invalid"}
                type="text"
                name="senderCity"
                id="senderCity"
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="senderPostCode">Post Code</label>
              <input
                className={errors.senderPostCode && "invalid"}
                type="text"
                name="senderPostCode"
                id="senderPostCode"
                onChange={handleChange}
              />
            </div>
            {/* MEDIA QUERY -- DESKTOP */}
            {width > 595 && (
              <div className="input">
                <label htmlFor="senderCountry">Country</label>
                <input
                  className={errors.senderCountry && "invalid"}
                  type="text"
                  name="senderCountry"
                  id="senderCountry"
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
          {/* MEDIA QUERY -- MOBILE */}
          {width <= 595 && (
            <div className="input">
              <label htmlFor="senderCountry">Country</label>
              <input
                className={errors.senderCountry && "invalid"}
                type="text"
                name="senderCountry"
                id="senderCountry"
                onChange={handleChange}
              />
            </div>
          )}
        </section>

        {/* BILL TO  */}
        <section className="bill-to">
          <h4>Bill To</h4>
          <div className="input">
            <label htmlFor="clientName">Client's Name</label>
            <input
              className={errors.clientName && "invalid"}
              type="text"
              name="clientName"
              id="clientName"
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label htmlFor="clientEmail">Client's Email</label>
            <input
              className={errors.clientEmail && "invalid"}
              type="email"
              name="clientEmail"
              id="clientEmail"
              onChange={handleChange}
            />
            <p className="invalid-message">
              {errors.clientEmail && `${errors.clientEmailMessage}`}
            </p>
          </div>
          <div className="input">
            <label htmlFor="clientStreet">Street Address</label>
            <input
              className={errors.clientStreet && "invalid"}
              type="text"
              name="clientStreet"
              id="clientStreet"
              onChange={handleChange}
            />
          </div>
          <div className="multiple-inputs">
            <div className="input">
              <label htmlFor="clientCity">City</label>
              <input
                className={errors.clientCity && "invalid"}
                type="text"
                name="clientCity"
                id="clientCity"
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="clientPostCode">Post Code</label>
              <input
                className={errors.clientPostCode && "invalid"}
                type="text"
                name="clientPostCode"
                id="clientPostCode"
                onChange={handleChange}
              />
            </div>
            {/* MEDIA QUERY -- DESKTOP */}
            {width > 595 && (
              <div className="input">
                <label htmlFor="clientCountry">Country</label>
                <input
                  className={errors.clientCountry && "invalid"}
                  type="text"
                  name="clientCountry"
                  id="clientCountry"
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
          {/* MEDIA QUERY -- MOBILE */}
          {width <= 595 && (
            <div className="input">
              <label htmlFor="clientCountry">Country</label>
              <input
                className={errors.clientCountry && "invalid"}
                type="text"
                name="clientCountry"
                id="clientCountry"
                onChange={handleChange}
              />
            </div>
          )}
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
              className={errors.description && "invalid"}
              type="text"
              name="description"
              id="description"
              onChange={handleChange}
            />
          </div>
        </section>

        {/* ITEM LIST  */}
        <section className="item-list">
          <span className="item-list--heading">Item List</span>
          {/* MEDIA QUERY -- DESKTOP */}
          {width > 595 ? (
            <table className="item-list--items">
              <tbody>
                <tr>
                  <th className="label">Item name</th>
                  <th className="label">Qty.</th>
                  <th className="label">Price</th>
                  <th className="label">Total</th>
                  <th className="label hidden">Remove</th>
                </tr>
                {formInputs.map((input, index) => (
                  <tr key={index}>
                    <td className="big">
                      <input
                        className={input.errorsName && "invalid"}
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={(e) => handleItemChange(index, e)}
                      />
                    </td>
                    <td className="small centered">
                      <input
                        className={input.errorsQuantity && "invalid"}
                        type="number"
                        placeholder="0"
                        value={input.quantity}
                        name="quantity"
                        onChange={(e) => handleItemChange(index, e)}
                      />
                    </td>
                    <td className="medium">
                      <input
                        className={input.errorsPrice && "invalid"}
                        type="number"
                        placeholder="0.00"
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
          ) : (
            // MEDIA QUERY -- MOBILE
            <table className="item-list--items">
              {formInputs.map((input, index) => (
                <tbody key={index}>
                  <tr>
                    <th className="label">Item name</th>
                  </tr>
                  <tr>
                    <td className="big">
                      <input
                        className={input.errorsName && "invalid"}
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={(e) => handleItemChange(index, e)}
                      />
                    </td>
                  </tr>
                  <tbody className="item-list--items--lower-body">
                    <tr>
                      <th className="label">Qty.</th>
                      <th className="label">Price</th>
                      <th className="label">Total</th>
                      <th className="label hidden">Remove</th>
                    </tr>
                    <tr>
                      <td className="small">
                        <input
                          className={input.errorsQuantity && "invalid"}
                          type="number"
                          placeholder="0"
                          value={input.quantity}
                          name="quantity"
                          onChange={(e) => handleItemChange(index, e)}
                        />
                      </td>
                      <td className="medium">
                        <input
                          className={input.errorsPrice && "invalid"}
                          type="number"
                          placeholder="0.00"
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
                  </tbody>
                </tbody>
              ))}
            </table>
          )}
          <div className="button">
            <Button
              onClick={() =>
                setFormInputs((prevState) => [
                  ...prevState,
                  {
                    id: uuidv4(),
                    name: "",
                    quantity: "",
                    price: "",
                    total: 0.0,
                  },
                ])
              }
              v={2}
              text="+ Add New Item"
            />
          </div>
          {Object.keys(errors).length > 0 && (
            <p className="invalid-message">All fields must be added</p>
          )}
        </section>
        {width > 595 ? (
          <div className="buttons">
            <div className="button-left">
              <Button onClick={() => discard()} v={2} text="Discard" />
            </div>
            <div className="buttons-right">
              <Button
                type={"submit"}
                onClick={checkSubmitButton}
                onSubmit={(e) => handleSubmit(e)}
                v={3}
                text="Save as Draft"
              />
              <Button
                type={"submit"}
                onClick={checkSubmitButton}
                onSubmit={(e) => handleSubmit(e)}
                text="Save & Send"
              />
            </div>
          </div>
        ) : (
          <div className="buttons">
            <Button onClick={() => discard()} v={2} text="Discard" />
            <Button
              type={"submit"}
              onClick={checkSubmitButton}
              onSubmit={(e) => preHandleSubmit(e)}
              v={3}
              text="Save as Draft"
            />
            <Button
              type={"submit"}
              onClick={checkSubmitButton}
              onSubmit={(e) => preHandleSubmit(e)}
              text="Save & Send"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default NewInvoice;
