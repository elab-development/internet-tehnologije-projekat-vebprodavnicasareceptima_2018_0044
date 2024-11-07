import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage';
import { useState } from 'react';
import RegisterPage from './components/RegisterPage';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import SastojakCard from './components/SastojakCard';
import ReceptCard from './components/ReceptCard';

function App() {
  const [token,setToken] = useState();
  const [userRole,setUserRole] =useState();
  function addToken(token){
    setToken(token);
  }
  function addUserRole(userRole){
    setUserRole();
  }
  function removeToken() {
    setToken(null);
    setUserRole(null);
  }
  function removeUserRole() {
    setUserRole(null);
  }
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path='/login' element={<LoginPage addToken={addToken} addUserRole={addUserRole}/>}    />
        <Route path='/register' element={<RegisterPage/>}    />
        <Route path='/' element={<><NavBar token={token} removeToken={removeToken} userRole={userRole} removeUserRole={removeUserRole} /><SastojakCard /> <ReceptCard/></>
      }  />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
