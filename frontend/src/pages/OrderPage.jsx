import React, { useContext } from 'react'
import './OrderPage.css'
import { StoreContext } from '../context/StoreContext'

const OrderPage = () => {
    const {getTotalCartAmount,couponTotal} = useContext(StoreContext)

    function handleCheckoutClick(){

    }

  return (
    <form action="" className="place-order">
        <div className="place-order-left">
            <p className="title">Informacije o isporuci</p>
            <div className="multi-fields">
                <input type="text" placeholder='Ime'/>
                <input type="text" placeholder='Prezime'/>
            </div>
            <input type="text" placeholder='E-mail adresa' />
            <div className="multi-fields">
                <input type="text" placeholder='Grad' />
                <input type="text" placeholder='Postanski broj' />
            </div>
            <input type="text" placeholder='Adresa' />
            <input type="text" placeholder='Telefon' />
        </div>
        <div className="place-order-right">
        <div className="cart-total">
          <h2>Iznos:</h2>
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
          <button onClick={handleCheckoutClick}>Placanje</button>
        </div>
        </div>
    </form>
  )
}

export default OrderPage