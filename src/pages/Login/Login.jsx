import React, { useState } from "react";
import Button from "../../components/Button/Button";
import { auth, provider,db } from "../../firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection, getDocs, query , where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import "./Login.scss";

const Login = () => {
  const [signup, setSignup] = useState(false);
  const [details,setDetails] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
  })
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, details.email, details.password)
      .then(async (result) => {
        const { uid } = result.user;
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        const { photoURL, email, displayName, uid } = doc.data();
          dispatch(
              setUser({
                  photoURL: photoURL,
                  email: email,
                  displayName: displayName,
                  uid: uid,
                  key : doc.id,
                })
                );
            });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (e) =>{
    setDetails({...details, [e.target.name]:e.target.value})
  }
  const handleSignup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth,details.email,details.password)
    .then(user =>{
    addDoc(collection(db, "users"), {
      photoURL: null,
      email: details.email,
      displayName: details.username,
      invoices : [],
      uid: user.user.uid,
    });
    handleLogin(e)
    setDetails({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    })
  };
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then(async (result) => {
      const { uid } = result.user;
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      // If there's no such user in our db, create file for it
      if(querySnapshot.empty){
          const { photoURL, email, displayName, uid } = auth.currentUser
          addDoc(collection(db, "users"), {
            photoURL: photoURL,
            email: email,
            displayName: displayName,
            invoices : [],
            uid: uid,
          });
          // set user in redux
          querySnapshot.forEach(doc =>{
            const { photoURL, email, displayName, uid } = doc.data();
            dispatch(
              setUser({
                photoURL: photoURL,
                email: email,
                displayName: displayName,
                uid: uid,
                key : doc.id,
              })
              );
          })
      }else{
        // if there's already such user in our db, just set up in redux.
        querySnapshot.forEach(doc =>{
          const { photoURL, email, displayName, uid } = doc.data();
          dispatch(
            setUser({
              photoURL: photoURL,
              email: email,
              displayName: displayName,
              uid: uid,
              key : doc.id,
            })
            );
        })
      }
      })
      .catch(error => {
        console.error(error);
      })
        
  };
  if (signup) {
    return (
      <div className="login-page">
        <div className="login-container">
          <h2 className="login-container--title">
            Sign up
            <p>
              Already have an account?{" "}
              <span onClick={() => setSignup(false)}>Log in</span>
            </p>
          </h2>
          <form onSubmit={handleSignup} className="login-container--form">
            <div className="login-container--form-input">
              <label htmlFor="username">Username</label>
              <input required onChange={handleChange} value={details.username} type="text" name="username" id="username" />
            </div>
            <div className="login-container--form-input">
              <label htmlFor="email">Email</label>
              <input required onChange={handleChange} value={details.email} type="email" name="email" id="email" />
            </div>
            <div className="login-container--form-input">
              <label htmlFor="password">Password</label>
              <input required onChange={handleChange} value={details.password} type="password" name="password" id="password" />
            </div>
            <div className="login-container--form-input">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input required onChange={handleChange} value={details.confirmPassword} type="password" name="confirmPassword" id="confirmPassword" />
            </div>
            <section className="buttons">
              <Button type='submit' text={"Sign up"} />
            </section>
          </form>
        </div>
      </div>
    );
  }
  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-container--title">
          Log in
          <p>
            Haven't got an account yet?{" "}
            <span onClick={() => setSignup(true)}>Sign up</span>
          </p>
        </h2>
        <form onSubmit={handleLogin} className="login-container--form">
          <div className="login-container--form-input">
            <label htmlFor="email">Email</label>
            <input onChange={handleChange} value={details.email} required type="email" name="email" id="email" />
          </div>
          <div className="login-container--form-input">
            <label htmlFor="password">Password</label>
            <input onChange={handleChange} value={details.password} required type="password" name="password" id="password" />
          </div>
          <section className="buttons">
            <Button type='submit' text={"Log in"} />
            <Button
              onClick={signInWithGoogle}
              type="google"
              text={"Log in with Google"}
            />
          </section>
        </form>
      </div>
    </div>
  );
};

export default Login;
