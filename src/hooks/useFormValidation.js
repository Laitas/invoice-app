import {useState,useEffect} from 'react'

const useFormValidation = (values,setValues,handleSubmit) => {
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);
    
    const validate = form =>{
        let errors = {}
    const {clientCity,
    clientCountry,
    clientPostCode,
    clientStreet,
    clientEmail,
    clientName,
    description,
    items,
    senderCity,
    senderCountry,
    senderPostCode,
    senderStreet} = form
    if(!clientCity){
        errors.clientCity = true
    }
    if(!clientCountry){
        errors.clientCountry = true
    }
    if(!clientPostCode){
        errors.clientPostCode = true
    }
    if(!clientStreet){
        errors.clientStreet = true
    }
    if(!clientEmail){
        errors.clientEmail = true
        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(clientEmail)){
            errors.clientEmailMessage = 'Invalid email address'
        }
    }
    if(!clientName){
        errors.clientName = true
    }
    if(!description){
        errors.description = true
    }
    if(!items){
        errors.items = true
    }
    if(!senderCity){
        errors.senderCity = true
    }
    if(!senderCountry){
        errors.senderCountry = true
    }
    if(!senderPostCode){
        errors.senderPostCode = true
    }
    if(!senderStreet){
        errors.senderStreet = true
    }
    return errors
    }

    const preHandleSubmit = e =>{
        e.preventDefault()
        const validationErrors = validate(values)
        setErrors(validationErrors)
        setSubmitting(true)
    }
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
    
    useEffect((e)=>{
        if(isSubmitting){
            //if errors length is 0 noErrors is true
            const noErrors = Object.keys(errors).length === 0
            if(noErrors){
                handleSubmit(e)
                setSubmitting(false)
            }else{
                setSubmitting(false)
            }
        }
    },[errors])
    return {
        preHandleSubmit,
        errors,
        handleChange
    }
}

export default useFormValidation
