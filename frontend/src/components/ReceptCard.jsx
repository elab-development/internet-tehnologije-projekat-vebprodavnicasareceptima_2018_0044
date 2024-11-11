import React from 'react';
import './Card.css'
import { useNavigate } from 'react-router-dom';

const Card = ({ id, name, description,  prep_time, imgSrc }) => {
    
  let navigate=useNavigate();

    const showRecept=()=>{
        navigate(`/recepti/${id}`); 
    }

  return (
    <div className="card-recept" onClick={showRecept}>
      <div className="card-img-container">
            <img src= {imgSrc || "https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp"} className="card-img-item" alt={name} />
      </div>
      <div className="card-info">
        <div className="card-name">
          <p>{name}</p>
        </div>
        <div className="card-desc-container">
        < p className="card-desc">{description}</p>
        </div>
        <p className="card-prep-time">{prep_time} min</p>
      </div>
    </div>


  );
};

export default Card;
