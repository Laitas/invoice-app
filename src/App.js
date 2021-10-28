import React, { useState, useEffect } from 'react'
import './App.scss';
import Nav from './components/Nav/Nav';
import {HashRouter, Route,Switch,Redirect} from 'react-router-dom'
import Login from './pages/Login/Login';
import Homepage from './pages/Homepage/Homepage';
import { auth } from './firebase';
 
function App() {
  const [currentUser, setCurrentUser] = useState(null)
  useEffect(()=>{
    auth.onAuthStateChanged(user =>{
      setCurrentUser(user)
    })
  },[currentUser])
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
              currentUser ? <Homepage /> : <Login/>
            }
          />
          {/* <Route exact path="/signup" component={Signup}/> */}
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
