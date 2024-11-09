import React, { useContext, useState } from 'react'
import './Home.css'
import Header from '../components/Header'
import ExploreKategorije from '../components/ExploreKategorije'
import ReceptDisplay from '../components/ReceptDisplay'
import SastojakCard from '../components/SastojakCard'
import { StoreContext } from '../context/StoreContext'


const HomePage = ({userRole}) => {
  const [category, setCategory] = useState("Izabrano");
  const{sastojci_list} = useContext(StoreContext);

  function addCategory(category){
    setCategory(category);
  }

  return (
    <div className='home'>
       <Header/> 
        <ExploreKategorije category={category} addCategory={addCategory}/>
        <ReceptDisplay category={category}/>
        <div className="sastojci">
        {sastojci_list.map((item,index)=>{
          return <SastojakCard key={index} userRole={userRole} id={item.id} name={item.name} price={item.price} unit={item.unit} imgSrc={item.imgSrc} />
        })}
          </div>
    </div>
  )
}

export default HomePage