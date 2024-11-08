import React from 'react'
import "./Header.css"

const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Recept na dohvat</h2>
            <p>Jednostavno do omiljenih recepata i namirnica.</p>
            <button>Pronađi recepte</button>
        </div>
    </div>
  )
}

export default Header