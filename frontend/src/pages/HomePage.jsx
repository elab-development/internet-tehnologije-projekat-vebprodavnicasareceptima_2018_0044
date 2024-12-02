import React, { useState, useEffect } from 'react'
import './Home.css'
import Header from '../components/Header'
import ExploreKategorije from '../components/ExploreKategorije.jsx'
import ReceptDisplay from '../components/ReceptDisplay.jsx'
import axios from 'axios'


const HomePage = () => {
  const [category, setCategory] = useState("Izabrano");
  const [receptiFromDb, setReceptiFromDb] = useState([])

  function addCategory(category){
    setCategory(category);
  }

  useEffect(() => {
    const fetchRecepti = async () => {
      try {
        const response = await axios.get('/api/recepti')
        const recepti = response.data.data;
        console.log(response.data.data)

        const filtriraniRecepti = category === "Izabrano"
        ? recepti.slice(0, 8) // prikaz svih recepata ili prvih 8
        : recepti
            .filter((recept) => recept.kategorija.id === category)
            .slice(0, 8);
        
        console.log(filtriraniRecepti)
        setReceptiFromDb(filtriraniRecepti)
      } catch (error) {
        console.error("Greška pri preuzimanju recepata:", error)
      }
    }

    fetchRecepti()
  }, [category])
 

  return (
    <div className='home'>
       <Header/> 
        <ExploreKategorije category={category} addCategory={addCategory}/>
        <h2>{category}</h2> 
        <ReceptDisplay recepti={receptiFromDb}/>
    </div>
  )
}

export default HomePage