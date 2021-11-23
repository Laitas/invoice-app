import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    createdAt: {},
    paymentTerms : 1,
    paymentDue : {},
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setCreatedAt : (state,action) =>{
            state.createdAt = action.payload
        },
        setPaymentTerms : (state,action) =>{
            state.paymentTerms = action.payload;
        },
        setPaymentDue : (state,action) =>{
            state.paymentDue = action.payload;
        }
    }
});

export const {
    setCreatedAt,setPaymentTerms, setPaymentDue
} = formSlice.actions
export default formSlice.reducer