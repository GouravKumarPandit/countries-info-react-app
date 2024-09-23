import React from 'react'

function Header() {
    return (
        <header className="header-container">
            <div className="header-content">
                <h2 className="title"><a href="/">Where in the world?</a></h2>
                <p className="theme-changer"><i className="fa-solid fa-sun"></i>&nbsp;&nbsp;<span id="light-dark-mode">Light Mode</span></p>
            </div>
        </header>
    )
}

export default Header