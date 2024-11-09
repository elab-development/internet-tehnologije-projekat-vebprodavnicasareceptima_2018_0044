import React, { useContext } from 'react'
import './ReceptDisplay.css'
import { StoreContext } from '../context/StoreContext'
import ReceptCard from './ReceptCard.jsx'

const ReceptDisplay = ({category}) => {
  
  const {recepti_list} = useContext(StoreContext)

  return (
    <div className='recept-display' id='recept-display'>
      <h2>{category}</h2>
      <div className="recept-display-list">
        {recepti_list.map((item,index)=>{
          if(category==="Izabrano" || category===item.kat_name){
            return <ReceptCard key={index} id={item.id} kat_name={item.kat_name} name={item.recept_name} description={item.recept_desc} prep_time={item.recept_time} imgSrc={item.recept_image}/>
          }
        })}
      </div>
    </div>
  )
}

export default ReceptDisplay