import React, { useState } from 'react'
import './Home.css'
import Header from '../components/Header'
import ExploreKategorije from '../components/ExploreKategorije'
import ReceptDisplay from '../components/ReceptDisplay'
import SastojakCard from '../components/SastojakCard'


const HomePage = ({userRole}) => {
  const [category, setCategory] = useState("All");

  function addCategory(category){
    setCategory(category);
  }

  return (
    <div className='home'>
       <Header/> 
        <ExploreKategorije category={category} addCategory={addCategory}/>
        <ReceptDisplay category={category}/>
        <div className="sastojci">
          <SastojakCard userRole={userRole} />
          <SastojakCard />
          <SastojakCard />
          <SastojakCard />
        </div>
    </div>
  )
}

export default HomePage