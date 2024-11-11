import React, { useContext, useState } from 'react';
import './Card.css'
import { PiShoppingCartFill } from "react-icons/pi";
import { TbShoppingCartPlus } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { StoreContext } from '../context/StoreContext';

const Card = ({id,name,unit, imgSrc, price,userRole, oznacen, addOznacenSastojak}) => {
  const [quantity, setQuantity] = useState(0);
  const {cartItems, addToCart, removeFromCart} = useContext(StoreContext);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };


  const handleAddToCart = () => {
    // Logika za dodavanje u korpu, npr. API poziv sa quantity vrednošću
    console.log(`Dodato u korpu: ${quantity} artikala`);
  };

  return (

    <div className="card-sastojak" onClick={()=>addOznacenSastojak(id)}>
      <div className={oznacen===id?"active":""}>
       <div className="card-img-container">
            <img src= {imgSrc} className="card-img-item" alt={name} />
            {userRole === "user" && (
              <>
               {!cartItems[id]
              ? <TbShoppingCartPlus  className='add' onClick={()=>addToCart(id)}/>
              : <div className="card-counter">
                <FaMinus onClick={()=>removeFromCart(id)}/>
                <p>{cartItems[id]} {unit || "kom"}</p>
                <FaPlus onClick={()=>addToCart(id)} />
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

export default Card;
