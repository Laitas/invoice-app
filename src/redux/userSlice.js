import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 user: {
   photoURL : '',
   email : '',
   displayName : '',
   uid : '',
   key : '',
 },
 invoices : [],
 toggleNewInvoice : false,
 toggleEditInvoice : false,
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
    toggleNew : state => {state.toggleNewInvoice = !state.toggleNewInvoice},
    toggleEdit : state => {state.toggleEditInvoice = !state.toggleEditInvoice},
  },
    setKey : (state,action) =>{
      state.user.key = action.payload
    }
});

export const {
    setUser, setInvoices, toggleNew, setKey, toggleEdit
} = userSlice.actions
export default userSlice.reducer