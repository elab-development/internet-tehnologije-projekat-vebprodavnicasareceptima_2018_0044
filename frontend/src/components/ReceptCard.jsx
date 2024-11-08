import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ id, title, text, imgSrc }) => {
    let navigate=useNavigate();

    const showRecept=()=>{
        navigate(`/recepti/${id}`); 
    }

  return (
    <div className="col-md-2 mx-auto mt-3"onClick={showRecept}> {}
      <div className="card">
        <img src= {imgSrc || "https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp"} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}||Recept 1</h5>
          <p className="card-text">{text}Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
