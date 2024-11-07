import React, { useState } from 'react';
import { PiShoppingCartFill } from "react-icons/pi";

const Card = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    // Logika za dodavanje u korpu, npr. API poziv sa quantity vrednošću
    console.log(`Dodato u korpu: ${quantity} artikala`);
  };

  return (
    <div className="col-md-2 mx-auto mt-4" >
      <div className="card">
        <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp" className="card-img-top" alt="Fissure in Sandstone" />
        <div className="card-body">
          <h5 className="card-title">Kartica sastojak</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          
          <div className="d-flex justify-content-between align-items-center mt-2">
            <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>1000 RSD</span>
            <div className="d-flex align-items-center">
              <button onClick={handleDecrease} className="btn btn-light btn-sm">-</button>
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} 
                style={{ width: '50px', textAlign: 'center', margin: '0 5px' }} 
              />
              <button onClick={handleIncrease} className="btn btn-light btn-sm">+</button>
              <button 
                onClick={handleAddToCart} 
                className="btn btn-primary ms-2" 
                data-mdb-ripple-init 
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <PiShoppingCartFill style={{ color: 'white', fontSize: '1.2rem' }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
