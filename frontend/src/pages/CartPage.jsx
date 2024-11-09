import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../context/StoreContext'

const CartPage = () => {
  const {cartItems,sastojci_list, removeFromCart, getTotalCartAmount} =useContext(StoreContext);

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
        {sastojci_list.map((item, index)=>{
          if(cartItems[item.id]>0){
            return(
              <div>
                <div className="cart-items-title cart-items-item">
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <p>{cartItems[item.id]}</p>
                  <p>{item.price*cartItems[item.id]}</p>
                  <p className='iks' onClick={()=>removeFromCart(item.id)}>X</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Ukupan iznos:</h2>
          <div>
            <div className="cart-total-details">
              <p>Cena hrane</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Cena dostave</p>
              <p>{250}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Ukupno</b>
              <b>{getTotalCartAmount()+250} RSD</b>
            </div>
          </div>
          <button>Kupi</button>
        </div>
      </div>
    </div>
  )
}

export default CartPage