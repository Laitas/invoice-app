import React, { useState, useEffect } from "react";
import Logo from "../../assets/logo.svg";
import IconMoon from "../../assets/icon-moon.svg";
import IconSun from "../../assets/icon-sun.svg";
import Userimg from "../../assets/image-avatar.jpg";
import { useSelector, useDispatch } from "react-redux";
import { auth, storage, db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { setInvoices, setUser } from "../../redux/userSlice";
import { signOut } from "@firebase/auth";
import "./Nav.scss";
const Nav = () => {
  const [theme, toggleTheme] = useState(false);
  const [dropdown, toggleDropdown] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleImageUpload = async (e) => {
    if (e.target.files[0]) {
      const storageRef = ref(storage, `Images/${e.target.files[0].name}`);
      const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              dispatch(
                setUser({
                  photoURL: url,
                  email: user.email,
                  displayName: user.displayName,
                  uid: user.uid,
                })
              );
              updateDoc(doc(db, "users", user.key), {
                photoURL: url,
              });
            })
            .catch((e) => console.log(e));
        }
      );
    } else {
      return;
    }
  };
  const userSignOut = () => {
    signOut(auth);
    dispatch(
      setUser({
        photoURL: "",
        email: "",
        displayName: "",
        uid: "",
      })
    );
    dispatch(setInvoices([]));
  };
  useEffect(() => {
    const body = document.body;
    if (theme && body.classList.contains("dark-theme")) {
      body.classList.remove("dark-theme");
    } else {
      body.classList.add("dark-theme");
    }
  }, [theme]);
  return (
    <>
      <nav className="nav">
        <div className="nav--logo">
          <img src={Logo} alt="" />
          <div className="nav--logo-whateverthatis"></div>
        </div>
        <div className="nav--bottom">
          <div className="nav--bottom-theme-toggle">
            <img
              src={theme ? IconMoon : IconSun}
              onClick={() => toggleTheme(!theme)}
              alt="theme toggle"
            />
          </div>
          {user.uid ? (
            <div
              onClick={() => toggleDropdown(!dropdown)}
              className="nav--bottom-user"
            >
              <img
                src={user && user.photoURL ? user.photoURL : Userimg}
                alt="user"
              />
            </div>
          ) : (
            <div className="nav--bottom-user">
              <img
                src={user && user.photoURL ? user.photoURL : Userimg}
                alt="user"
              />
            </div>
          )}
        </div>
      </nav>
      <div
        className={`nav--dropdown ${
          dropdown ? "nav--dropdown-active" : "nav--dropdown-hidden"
        }`}
      >
        <ul>
          <li>
            <label>
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={(e) => {
                  handleImageUpload(e);
                }}
                accept="image/png, image/jpeg"
              />
              Upload picture
            </label>
          </li>
          <li
            onClick={() => {
              toggleDropdown(false);
              userSignOut();
            }}
          >
            Sign out
          </li>
        </ul>
      </div>
    </>
  );
};

export default Nav;
