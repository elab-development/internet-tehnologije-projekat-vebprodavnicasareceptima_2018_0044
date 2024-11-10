import React from 'react'
import "./Header.css"
import { useNavigate } from 'react-router-dom'

const Header = () => {

  let navigate=useNavigate();
  function handleClick(){
    navigate('/filter');
  }
  
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Recept na dohvat</h2>
            <p>Jednostavno do omiljenih recepata i namirnica.</p>
            <button onClick={handleClick}>Ponuda</button>
        </div>
    </div>
  )
}

export default Header