import React from 'react';
import './Card.css'
import { useNavigate } from 'react-router-dom';

const Card = ({ id, kat_name, name, description,  prep_time, imgSrc }) => {
    let navigate=useNavigate();

    const showRecept=()=>{
        navigate(`/recepti/${id}`); 
    }

  return (
    // <div className="col-md-2 mx-auto mt-3"onClick={showRecept}> {}
    //   <div className="card">
    //     <img src= {imgSrc || "https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp"} className="card-img-top" alt={name} />
    //     <div className="card-body">
    //       <h5 className="card-title">{name ||"Recept x"}</h5>
    //       <p className="card-text">{description || "Some quick example text to build on the card title and make up the bulk of the card's content."}</p>
    //     </div>
    //   </div>
    // </div>
    <div className="card" onClick={showRecept}>
      <div className="card-img-container">
            <img src= {imgSrc || "https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp"} className="card-img-item" alt={name} />
      </div>
      <div className="card-info">
        <div className="card-name">
          <p>{name}</p>
        </div>
        <p className="card-desc">{description}</p>
        <p className="card-prep-time">{prep_time}</p>
      </div>
    </div>


  );
};

export default Card;
