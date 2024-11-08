import React, { useState } from 'react'
import './Home.css'
import Header from '../components/Header'
import ExploreKategorije from '../components/ExploreKategorije'

const HomePage = () => {
  const [category, setCategory] = useState("All");

  function addCategory(category){
    setCategory(category);
  }

  return (
    <div className='home'>
       <Header/> 
        <ExploreKategorije category={category} addCategory={addCategory}/>

    </div>
  )
}

export default HomePage