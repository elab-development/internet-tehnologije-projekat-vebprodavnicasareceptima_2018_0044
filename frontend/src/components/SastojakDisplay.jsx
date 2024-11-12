import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './SastojakDisplay.css'
import { StoreContext } from '../context/StoreContext'
import SastojakCard from './SastojakCard.jsx'
import { assets } from '../assets/assets.js'

const SastojakDisplay = ({sastojci, recepti=null,setRecepti=null}) => {

  const{sastojci_list,userRole,token} = useContext(StoreContext);
  // const [recepti, setRecepti] = useState([]);
  const [oznacenSastojak, setOznacenSastojak] = useState(0);
  
  function addOznacenSastojak(sId){
    setOznacenSastojak(sId);
  }

  //Recepti u kojima se koristi sastojak
  useEffect(() => {      
    if(setRecepti!=null){ 
      console.log("Rola "+userRole)
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
    }
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
                                id={sastojakItem.id}
                                name={sastojakItem.naziv}
                                unit={sastojakItem.merna_jedinica}
                                imgSrc={item?.imgSrc || assets.logo}
                                price={sastojakItem.cena}
                                userRole={userRole}
                                oznacen={oznacenSastojak}
                                token={token}
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