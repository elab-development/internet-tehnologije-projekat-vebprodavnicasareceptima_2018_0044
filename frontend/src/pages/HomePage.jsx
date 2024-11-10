import React, { useContext, useState } from 'react'
import './Home.css'
import Header from '../components/Header'
import ExploreKategorije from '../components/ExploreKategorije'
import ReceptDisplay from '../components/ReceptDisplay'



const HomePage = ({userRole}) => {
  const [category, setCategory] = useState("Izabrano");

  function addCategory(category){
    setCategory(category);
  }

  return (
    <div className='home'>
       <Header/> 
        <ExploreKategorije category={category} addCategory={addCategory}/>
        <ReceptDisplay category={category}/>
    </div>
  )
}

export default HomePage