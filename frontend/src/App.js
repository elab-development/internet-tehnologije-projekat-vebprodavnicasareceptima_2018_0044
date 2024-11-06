import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage';
import { useState } from 'react';
import RegisterPage from './components/RegisterPage';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {
  const [token,setToken] = useState();

  function addToken(token){
    setToken(token);
  }
  function removeToken() {
    setToken(null);
  }
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path='/login' element={<LoginPage addToken={addToken} />}    />
        <Route path='/register' element={<RegisterPage/>}    />
        <Route path='/' element={<NavBar  token={token} removeToken={removeToken}/>}  />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
