import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './SastojakDisplay.css'
import { StoreContext } from '../context/StoreContext'
import SastojakCard from './SastojakCard.jsx'
import { assets } from '../assets/assets.js'
import ReceptDisplay from './ReceptDisplay.jsx'

const SastojakDisplay = ({sastojci,userRole, recepti=null,setRecepti=null}) => {

  const{sastojci_list} = useContext(StoreContext);
  // const [recepti, setRecepti] = useState([]);
  const [oznacenSastojak, setOznacenSastojak] = useState(0);
  
  function addOznacenSastojak(sId){
    setOznacenSastojak(sId);
  }

  //Recepti u kojima se koristi sastojak
  useEffect(() => {      
    const fetchReceptiBySastojak = async (sastojakId) => {
      try {
        const response = await axios.get(`/api/recepti/sastojak/${sastojakId}`);
        setRecepti(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        console.error("Greška pri preuzimanju recepata:", error);
      }
    };  
    fetchReceptiBySastojak(oznacenSastojak);
  }, [oznacenSastojak]);
  
  if (!sastojci || sastojci.length===0) {
    return <h4 className='nema-vrednosti'>Nema sastojaka</h4>;
  }

  return (
    <div className='sastojak-display' id='sastojak-display'>
      <div className="sastojak-display-list">
                {sastojci.map((sastojakItem, index) => {
                    const item = sastojci_list.find(sastojak => sastojak.id === sastojakItem.id);
                    return (
                        (
                            <SastojakCard
                                key={index}
                                id={item.id}
                                name={sastojakItem.naziv}
                                unit={sastojakItem.merna_jedinica}
                                imgSrc={item.imgSrc || assets.logo}
                                price={200}
                                userRole={userRole}
                                oznacen={oznacenSastojak}
                                addOznacenSastojak={addOznacenSastojak}
                            />
                        )
                    );
                })}
      </div>
    </div>
  )
}

export default SastojakDisplay