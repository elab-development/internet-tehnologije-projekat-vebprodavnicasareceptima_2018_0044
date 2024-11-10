import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import './ReceptDisplay.css'
import { StoreContext } from '../context/StoreContext'
import ReceptCard from './ReceptCard.jsx'

const ReceptDisplay = ({category}) => {
  
  const {recepti_list} = useContext(StoreContext)
  const [recepti, setRecepti] = useState([])

  useEffect(() => {
    const fetchRecepti = async () => {
      try {
        const response = await axios.get('/api/recepti')
        const receptiFromDb = response.data.data

        const receptiWithImages = receptiFromDb.map((recept) => {
          const matchingRecept = recepti_list.find(item => item.id === recept.id)
          return matchingRecept ? { ...recept, recept_image: matchingRecept.recept_image } : recept
        })

        setRecepti(receptiWithImages)
      } catch (error) {
        console.error("Greška pri preuzimanju recepata:", error)
      }
    }

    fetchRecepti()
  }, [recepti_list])

  return (
    <div className='recept-display' id='recept-display'>
      <h2>{category}</h2> {/* Promeni nakon ucitavanja*/}
      <div className="recept-display-list">
        {recepti.filter((item) => category === "Izabrano" || category === item.id)
            .slice(0, category === "Izabrano" ? 8 : recepti.length)
            .map((item, index)=>{
            if(category==="Izabrano" || category===item.id){
             return <ReceptCard key={index} id={item.id} name={item.naziv} description={item.opis} prep_time={item.vreme_pripreme} imgSrc={item.recept_image}/>
          }
        })}
      </div>
    </div>
  )
}

export default ReceptDisplay