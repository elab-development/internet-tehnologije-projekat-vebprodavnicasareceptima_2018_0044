import React, { useContext, useState } from 'react'
import './OrderPage.css'
import axios from 'axios'
import { StoreContext } from '../context/StoreContext'

const OrderPage = () => {
    const {getTotalCartAmount,couponTotal, userRole, cartItems, token} = useContext(StoreContext)
    
    const [formData, setFormData] = useState({
      ime: '',
      prezime: '',
      email: '',
      grad: '',
      postanski_broj: '',
      adresa: '',
      telefon: ''
    });
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleCheckoutClick = async (e) =>{
      e.preventDefault();

      try {
          // kreira narudžbinu
          const response = await axios.post(
            '/api/narudzbine',
            {
                ...formData,
                ukupan_iznos: getTotalCartAmount() + 250 - couponTotal,
                status: 'na_cekanju'
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        
        console.log(response.data.message);

        if (response.data && response.data.narudzbina_id) {
          const narudzbinaId = response.data.narudzbina_id;

          // dodaje stavke narudžbine
          const stavke = cartItems.map(item => ({
            narudzbina_id: narudzbinaId,
            sastojak_id: item.id,
            kolicina: item.pivot.kolicina,
            cena: item.cena
          }));

          const stavkeResponse = await axios.post(
            '/api/stavke-narudzbine',
            { stavke },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
          );

        console.log(stavkeResponse.data.message);        
        }
        
        // salje podatke i redirektuj na Stripe page
        const ukupnaCena = getTotalCartAmount() + 250 - couponTotal;

        const stripeResponse = await axios.post(
            '/api/checkout',
          {
            items: cartItems.map((item) => ({
              naziv: item.naziv,
              cena: item.cena,
              kolicina: item.pivot.kolicina,
            })),
            couponTotal: couponTotal
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (stripeResponse.data && stripeResponse.data.url) {
            window.location.href = stripeResponse.data.url;
        }

      } catch (error) {
          console.error('Greška pri slanju narudžbine:', error);
      }
    }
    
    // if (userRole !== 'user') {
    //   return <p>Nemate dozvolu za pristup ovoj stranici.</p>;
    // }
 
  return (
    <form action="" className="place-order">
        <div className="place-order-left">
            <p className="title">Informacije o isporuci</p>
            <div className="multi-fields">
                <input type="text" placeholder='Ime' name="ime" value={formData.ime} onChange={handleChange}/>
                <input type="text" placeholder='Prezime' name="prezime" value={formData.prezime} onChange={handleChange}/>
            </div>
            <input type="text" placeholder='E-mail adresa'name="email" value={formData.email} onChange={handleChange} />
            <div className="multi-fields">
                <input type="text" placeholder='Grad' name="grad" value={formData.grad} onChange={handleChange}/>
                <input type="text" placeholder='Postanski broj' name="postanski_broj" value={formData.postanskiBroj} onChange={handleChange}/>
            </div>
            <input type="text" placeholder='Adresa' name="adresa" value={formData.adresa} onChange={handleChange}/>
            <input type="text" placeholder='Telefon' name="telefon" value={formData.telefon} onChange={handleChange} />
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