import React, { useState, useEffect } from 'react'
import './App.scss';
import Nav from './components/Nav/Nav';
import {HashRouter, Route,Switch,Redirect} from 'react-router-dom'
import Login from './pages/Login/Login';
import Homepage from './pages/Homepage/Homepage';
import { auth } from './firebase';
import Invoicepage from './pages/Invoicepage/Invoicepage';
import { useDispatch, useSelector } from 'react-redux';
import { toggleEdit, toggleNew } from './redux/userSlice';

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const newInvoiceSelector = useSelector(state => state.user.toggleNewInvoice)
  const editInvoiceSelector = useSelector(state => state.user.toggleEditInvoice)
  const dispatch = useDispatch()
 
  useEffect(()=>{
    auth.onAuthStateChanged(user =>{
      setCurrentUser(user)
    })
  },[currentUser])
  useEffect(()=>{
    if(newInvoiceSelector){
      dispatch(toggleNew())
    }
    if(editInvoiceSelector){
      dispatch(toggleEdit())
    }
  },[])
  return (
    <HashRouter>
      <Nav />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              currentUser ? <Homepage /> : <Redirect to="/login" />
            }
          />
          <Route
            exact
            path="/login"
            render={() =>
              currentUser ? <Redirect to='/'/> : <Login/>
            }
          />
          <Route exact path='/invoices/:id' component={Invoicepage}/>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
