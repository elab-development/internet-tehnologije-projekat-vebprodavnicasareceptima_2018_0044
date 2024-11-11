import './App.css';
import LoginPage from './pages/LoginPage';
import { useState } from 'react';
import RegisterPage from './pages/RegisterPage';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import ReceptPage from './pages/ReceptPage';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import CartPage from './pages/CartPage';
import SearchPage from './pages/SearchPage';

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
      <NavBar token={token} removeToken={removeToken} userRole={userRole} removeUserRole={removeUserRole}/>
      <Routes>
        <Route path='/login' element={<LoginPage addToken={addToken} addUserRole={addUserRole}/>}    />
        <Route path='/register' element={<RegisterPage/>}    />
        <Route path="/recepti/:id" element={<ReceptPage userRole={userRole} />} />
        <Route path='/' element={<HomePage/>}  />
        <Route path='/korpa' element={<CartPage/>}/>
        <Route path='/filter' element={<SearchPage userRole={userRole}/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
