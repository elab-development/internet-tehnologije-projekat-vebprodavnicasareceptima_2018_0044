import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import './Card.css'
import { TbShoppingCartPlus } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { StoreContext } from '../context/StoreContext';

const SastojakCard = ({id,name,unit, imgSrc, price, oznacen, addOznacenSastojak}) => {

  const {cartItems,addToCart,removeFromCart,updateQuantity,token,userRole} = useContext(StoreContext);
  const item = Array.isArray(cartItems) ? cartItems.find((sastojak) => sastojak.id === id) : null;

  function handlePlusClick(id){
    const item = cartItems.find((sastojak) => sastojak.id === id);
    updateQuantity(id,item.pivot.kolicina+1)
  }

  function handleRemoveFromCart(id){
    const item = cartItems.find((sastojak) => sastojak.id === id);
    if (!item) {
      console.log("Sastojak nije pronađen u korpi.");
      return;
    }
    const currentQuantity = item.pivot.kolicina;

    if (currentQuantity === 1) {
        removeFromCart(id);        
    } else {
        updateQuantity(id, currentQuantity - 1);
    }
  }

  return (
    <div className="card-sastojak" onClick={()=>addOznacenSastojak(id)}>
      <div className={oznacen===id?"active":""}>
       <div className="card-img-container">
            <img src= {imgSrc} className="card-img-item" alt={name} />
            {userRole === "user" && (
              <>
               {!item
              ? <TbShoppingCartPlus  className='add' onClick={()=>addToCart(id,1)}/>
              : <div className="card-counter">
                <FaMinus onClick={()=>handleRemoveFromCart(id)}/>
                <p>{item.pivot.kolicina} {unit || "kom"}</p>
                <FaPlus onClick={()=>handlePlusClick(id)} />
               </div> 
               } 
              </>
            )}
      </div>
      <div className="card-info">
        <div className="card-name">
          <p>{name}</p>
        </div>
        <p className="card-price">{price}RSD</p>
      </div>
     </div>
    </div>
  );
};

export default SastojakCard;
