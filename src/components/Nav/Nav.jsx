import React from 'react'
import Logo from '../../assets/logo.svg'
import IconMoon from '../../assets/icon-moon.svg'
import Userimg from '../../assets/image-avatar.jpg'
import './Nav.scss'
const Nav = () => {
    return (
        <nav className="nav">
            <div className="nav--logo">
            <img src={Logo} alt="" />
            <div className="nav--logo-whateverthatis"></div>
            </div>
            <div className="nav--bottom">
                <div className="nav--bottom-theme-toggle">
                    <img src={IconMoon} alt="theme toggle" />
                </div>
                <div className="nav--bottom-user">
                    <img src={Userimg} alt="user" />
                </div>
            </div>
        </nav>
    )
}

export default Nav
