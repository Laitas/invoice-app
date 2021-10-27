import React, { useState } from 'react'
import './App.scss';
import Nav from './components/Nav/Nav';
import {HashRouter, Route,Switch,Redirect} from 'react-router-dom'
import Login from './pages/Login/Login';
import Homepage from './pages/Homepage/Homepage';
 
function App() {
  const [user,setUser] = useState(null)
  return (
    <HashRouter>
      <Nav />
    <div className="App">
      <Switch>
        <Route exact path="/" render={()=> user ? <Homepage/> : <Redirect to='/login'/>}/>
        <Route exact path="/login" component={Login}/>
        {/* <Route exact path="/signup" component={Signup}/> */}
      </Switch>
    </div>
    </HashRouter>
  );
}

export default App;
