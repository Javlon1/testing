import * as React from 'react'
import './Header.scss'
import logo from "../../Assets/Img/logo.png"

export default function Header() {
    return (
        <header className="header">
            <div className="container">
                <nav className="container__nav">
                    <div>
                        {/* <img src="{logo}"alt="logo" loading="lazy" /> */}
                    </div>
                    <div className="container__nav__number">
                        <a href="tel:998916042288">+998 91 604-22-88</a>
                    </div>
                </nav>
            </div>
        </header>
    )
}

