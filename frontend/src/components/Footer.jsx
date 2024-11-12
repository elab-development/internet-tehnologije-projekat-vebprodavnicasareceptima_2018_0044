import React from 'react'
import './Footer.css'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    let navigate=useNavigate();
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Recept na dohvat!</p>
            </div>
            <div className="footer-content-right">
                <h2>KORPA+</h2>
                <ul>
                    <li onClick={()=>{navigate('/')}}>Pocetna</li>
                    <li onClick={()=>{navigate('/filter')}}>Recepti</li>
                    <li>
                    <a href="https://github.com/elab-development/internet-tehnologije-projekat-vebprodavnicasareceptima_2018_0044" target='_blank'>Git</a>
                    </li>
                </ul>
            </div>
            {/* <div className="footer-content-center">

            </div> */}
        </div>
        <hr />
    </div>
  )
}

export default Footer