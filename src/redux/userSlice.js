import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 user: {
   photoURL : '',
   email : '',
   displayName : '',
   uid : ''
 },
 invoices : [],
 toggleNewInvoice : false
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setInvoices: (state, action) => {
      state.invoices = action.payload
    },
    toggleNew : state => {state.toggleNewInvoice = !state.toggleNewInvoice}
  },
});

export const {
    setUser, setInvoices, toggleNew
} = userSlice.actions
export default userSlice.reducer