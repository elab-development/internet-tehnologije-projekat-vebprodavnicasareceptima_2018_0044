import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import './ReceptDisplay.css'
import { StoreContext } from '../context/StoreContext'
import ReceptCard from './ReceptCard.jsx'
import { assets } from '../assets/assets.js'

const ReceptDisplay = ({recepti}) => {
  
  const {recepti_list} = useContext(StoreContext)

  if (!recepti || recepti.length === 0) {
    return <h4 className='nema-vrednosti'>Nema recepata</h4>;
  }

  return (
    <div className='recept-display' id='recept-display'>
      <div className="recept-display-list">
        {recepti.map((item, index)=>{
          const recept_img = recepti_list.find(recept => recept.id === item.id);
          return (
            (
                <ReceptCard key={index} id={item.id} name={item.naziv} description={item.opis} prep_time={item.vreme_pripreme} imgSrc={recept_img.recept_image || assets.logo}/>
              ))})}
      </div>
    </div>
  )
}

export default ReceptDisplay