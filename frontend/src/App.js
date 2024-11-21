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
import ThankYouPage from './pages/ThankYouPage';
import AdminPage from './pages/AdminPage';
import OrderPage from './pages/OrderPage';

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/login' element={<LoginPage/>}    />
        <Route path='/register' element={<RegisterPage/>}    />
        <Route path="/recepti/:id" element={<ReceptPage />} />
        <Route path='/' element={<HomePage/>}  />
        <Route path='/korpa' element={<CartPage />}/>
        <Route path='/filter' element={<SearchPage />}/>
        <Route path='/kupovina' element={<ThankYouPage/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/order' element={<OrderPage/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
