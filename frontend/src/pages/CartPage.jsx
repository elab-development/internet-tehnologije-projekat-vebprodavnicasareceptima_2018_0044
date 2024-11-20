import React, { useContext, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import CouponInput from '../components/CouponInput'

const CartPage = () => {
  const {cartItems, removeFromCart, getTotalCartAmount, userRole, token,setCartItems} =useContext(StoreContext);
  const [couponTotal, setCouponTotal] = useState(0)
  let navigate=useNavigate()

  function handleKupiClick(){
    if(getTotalCartAmount()!==0){
      navigate('/kupovina')
    }
  }

  function handleRemoveAllClick(){
    let config = {
      method: 'delete',
      url: 'http://localhost:8000/api/korpa/isprazni',
      headers: { 
        Authorization: `Bearer ${token}`
      }
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setCartItems([])
    })
    .catch((error) => {
      console.log(error);
    });
  }

  if(userRole!=='user'){
    return <p>Ne mozete pristupiti ovoj stranici</p>
  }

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Sastojak</p>
          <p>Cena</p>
          <p>Kolicina</p>
          <p>Ukupno</p>
          <p>Ukloni</p>
        </div>
        <br />
        <hr />
        {cartItems.map((item)=>{
            return(
              <div key={item.id}>
                <div className="cart-items-title cart-items-item">
                  <p>{item.naziv}</p>
                  <p>{item.cena} RSD</p>
                  <p>{item.pivot.kolicina} {item.merna_jedinica}</p>
                  <p>{item.cena*item.pivot.kolicina} RSD</p>
                  <p className='iks' onClick={()=>removeFromCart(item.id)}>X</p>
                </div>
                <hr />
              </div>
            )
        })}

      </div>
      <div className='btn-remove-container'>
        <button className='btn-remove-all' onClick={handleRemoveAllClick}>Isprazni korpu</button>
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
        <div className='coupon-container'>
            <CouponInput setCouponTotal={setCouponTotal}/>
        </div>
          <h2>Ukupan iznos:</h2>
          <div>
            <div className="cart-total-details">
              <p>Cena hrane</p>
              <p>{getTotalCartAmount()} RSD</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Popust</p>
              <p>{couponTotal} RSD</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Cena dostave</p>
              <p>{250} RSD</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Ukupno</b>
              <b>{getTotalCartAmount()+250-couponTotal} RSD</b>
            </div>
          </div>
          <button onClick={handleKupiClick}>Kupi</button>
        </div>
      </div>
    </div>
  )
}

export default CartPage