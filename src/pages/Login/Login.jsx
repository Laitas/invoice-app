import React from 'react'
import Button from '../../components/Button/Button'
import { auth,provider } from '../../firebase'
import {signInWithPopup} from 'firebase/auth'
import { useDispatch } from 'react-redux'
import {setUser} from '../../redux/userSlice'
import './Login.scss'

const Login = () => {
    const dispatch = useDispatch()
    const handleSubmit = (e) =>{
        e.preventDefault()

    }
    const signInWithGoogle = () =>{
        signInWithPopup(auth, provider)
          .then((result) => {
              console.log(result.user);
              const { photoURL,email,displayName,uid } = result.user
              dispatch(setUser({
                  photoURL: photoURL,
                  email: email,
                  displayName: displayName,
                  uid : uid
              }))

          })
          .catch((error) => {
            console.log(error);
          });
    }
    return (
        <div className="login-page">
            <div className="login-container">
                <h2 className="login-container--title">
                    Log in
                </h2>
                <form onSubmit={handleSubmit} className="login-container--form">
                <div className="login-container--form-input">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className="login-container--form-input">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </div>
                <section className="buttons">
                    <Button text={'Log in'}/>
                    <Button onClick={signInWithGoogle} type="google" text={'Log in with Google'}/>
                </section>
                </form>
            </div>
        </div>
    )
}

export default Login
