import React from 'react'
import './Footer.css'
import { assets } from '../assets/assets'

const Footer = () => {
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
                    <li>Pocetna</li>
                </ul>
            </div>
            <div className="footer-content-center">
                <h2>Kontaktirajte me</h2>
                <a href="https://github.com/elab-development/internet-tehnologije-projekat-vebprodavnicasareceptima_2018_0044">Git</a>
            </div>
        </div>
        <hr />
    </div>
  )
}

export default Footer