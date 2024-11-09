import React from 'react'
import './ExploreKategorije.css'
import { kategorija_list } from '../assets/assets'

const ExploreKategorije = ({category,addCategory}) => {
  return (
    <div className='explore-kat' id='explore-kat'>
      <h1>Kreirajte jelovnik sa lakoćom!</h1>
      <p className='explore-kat-text'>Koristite kategorije da brzo pronađete recepte koji vam odgovaraju – od predjela do deserta.</p>
      <div className="explore-kat-list">
        {kategorija_list.map((item,index)=>{
          return(
            <div onClick={()=> addCategory(prev=>prev===item.kat_name?"Izabrano":item.kat_name)} key={index} className="explore-kat-list-item">
              <img className={category===item.kat_name?"active":""} src={item.kat_image} alt="" />
              <p>{item.kat_name}</p>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreKategorije