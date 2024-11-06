import React,{useState} from 'react'
import axios from 'axios';

const NavBar = ({token,removeToken}) => {
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
            removeToken();
          })
          .catch((error) => {
            console.log(error);
          });
    }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">Korpa+</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Recepti</a>
                </li>
                 {token==null ? (
                    <li className="nav-item">
                     <a className="nav-link" href="/login">Login</a>
                     </li>

                 ) : (
                    <li className="nav-item">
                    <a className="nav-link" href="#" onClick={handleLogout}>Logout</a>
                    </li>
                )}   
                <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">nesto disabled</a>
                </li>
            </ul>
            </div>
        </div>
    </nav>
  )
}

export default NavBar