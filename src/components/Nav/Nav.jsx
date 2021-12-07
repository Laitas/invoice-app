import React , {useState, useEffect} from 'react'
import Logo from '../../assets/logo.svg'
import IconMoon from '../../assets/icon-moon.svg'
import IconSun from '../../assets/icon-sun.svg'
import Userimg from '../../assets/image-avatar.jpg'
import { useSelector, useDispatch } from 'react-redux'
import { auth } from '../../firebase'
import { setInvoices, setUser } from '../../redux/userSlice'
import { signOut } from '@firebase/auth'
import './Nav.scss'
const Nav = () => {
    const [theme,toggleTheme] = useState(false)
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const userSignOut = () =>{
        signOut(auth);
        dispatch(
          setUser({
            photoURL: "",
            email: "",
            displayName: "",
            uid: "",
          })
        );
        dispatch(setInvoices([]))
    }
    useEffect(()=>{
        const body = document.body
        if(theme && body.classList.contains('dark-theme')){
            body.classList.remove('dark-theme')
        }else{
            body.classList.add('dark-theme')
        }
    },[theme])
    return (
        <nav className="nav">
            <div className="nav--logo">
            <img src={Logo} alt="" />
            <div className="nav--logo-whateverthatis"></div>
            </div>
            <div className="nav--bottom">
                <div className="nav--bottom-theme-toggle">
                    <img src={theme ? IconMoon : IconSun} onClick={()=> toggleTheme(!theme)} alt="theme toggle" />
                </div>
                <div onClick={userSignOut} className="nav--bottom-user">
                    <img src={user && user.photoURL ? user.photoURL : Userimg} alt="user" />
                </div>
            </div>
        </nav>
    )
}

export default Nav
