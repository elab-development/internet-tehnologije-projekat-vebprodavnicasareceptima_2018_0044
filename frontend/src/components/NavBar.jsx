import React,{useState} from 'react'
import './NavBar.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from "react-icons/bi";
import { PiShoppingCartFill } from "react-icons/pi";
import { assets } from '../assets/assets';

const NavBar = ({token,removeToken, userRole,removeUserRole}) => {
    const navigate = useNavigate();
    const handleRegisterClick = () => {
        navigate('/register');
    };  
    const handleSearchClick = () => {
        navigate('/register'); //paginacija i filter recepata
    };  
    const handleLogoClick = () => {
      navigate('/');
  };  

    function handleLogout(){        
        let config = {
            method: 'post',
            url: 'http://localhost:8000/api/logout',
            headers: { 
              Authorization: `Bearer ${token}`
            }
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            window.sessionStorage.setItem("auth_token",null);
            window.sessionStorage.setItem("role",null);
            window.sessionStorage.setItem("username",null);
            removeToken();
            removeUserRole();
          })
          .catch((error) => {
            console.log(error);
          });
        
        
    }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <img src={assets.logo} alt="" className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}/>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
           {/* <ul className="navbar-nav d-flex w-100 justify-content-between align-items-center">*/}
            <ul className="navbar-nav me-auto">
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Recepti</a>
                </li>
            </ul>
                <form className="d-flex input-group w-auto mx-auto">
                <input
                    type="search"
                    className="form-control rounded"
                    placeholder="Pretraži"
                    aria-label="Search"
                    aria-describedby="search-addon"
                />
                <span className="input-group-text border-0" id="search-addon" style={{ cursor: 'pointer' }} onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#05ad86'}} onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent'}}>
                  <BiSearch onClick={handleSearchClick} style={{ color: 'black', fontSize: '1.2rem' }}/>
                </span>
                </form>  

                 {token==null ? (
                    <ul className="navbar-nav ms-auto"><li className="nav-item">
                     <a className="nav-link" href="/login">Prijavi se</a>
                     </li>
                     <li className="nav-item">
                     <button data-mdb-ripple-init type="button" className="btn btn-primary ms-2" onClick={handleRegisterClick}>
                         Registruj se
                     </button>
                    </li> 
                    </ul>

                 ) : (
                   <ul className="navbar-nav ms-auto">
                  {window.sessionStorage.getItem("role") !== "admin" && (
                   <span className="input-group-text border-0" id="search-addon" style={{ cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#05ad86'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                    <PiShoppingCartFill onClick={handleSearchClick} style={{ color: 'black', fontSize: '1.2rem' }}/>
                   </span>
                  )}
                   <li className="nav-item ">
                        <a className="nav-link" href="#" onClick={handleLogout}>Odjavi se</a>
                    </li>                        
                    </ul> 
                )} 
                
            {/*</ul> */}
            </div>
        </div>
    </nav>
  )
}

export default NavBar