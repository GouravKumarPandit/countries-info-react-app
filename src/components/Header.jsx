import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
    const [theme, setTheme] = useState(false);
    const [icon, setIcon] = useState("sun");

    function setDarkOrLightTheme(value){     
        setTheme(value);
        if(value){
            setIcon('moon')
            localStorage.setItem("theme", "Light");
            document.body.classList.remove('dark');
        }  else{
            setIcon('sun');
            document.body.classList.add('dark');
            localStorage.setItem("theme", "Dark");
        }  
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if(savedTheme == "Light") setDarkOrLightTheme(true);
        else setDarkOrLightTheme(false);
    }, [])

    return (
        <header className="header-container">
            <div className="header-content">
                <h2 className="title"><Link to="/">Where in the world?</Link></h2>
                <p className="theme-changer" onClick={() => setDarkOrLightTheme(!theme)}><i className={`fa-solid fa-${icon}`}></i>&nbsp;&nbsp;<span >{theme ? "Dark" : "Light"} Mode</span></p>
            </div>
        </header>
    )
}

export default Header