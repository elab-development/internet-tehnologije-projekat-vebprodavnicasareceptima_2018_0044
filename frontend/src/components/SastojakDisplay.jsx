import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './SastojakDisplay.css'
import { StoreContext } from '../context/StoreContext'
import SastojakCard from './SastojakCard.jsx'

const SastojakDisplay = ({id,userRole}) => {

    const{sastojci_list} = useContext(StoreContext)
    const [receptSastojci, setreceptSastojci] = useState(null);

      useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/recepti/${id}/sastojci`, {
                    headers: { 'Content-Type': 'application/json' }
                });
                setreceptSastojci(response.data.data); //!!Ugnjezdeno 
                console.log("Podaci o sastojcima:", response.data.data);
            } catch (error) {
                console.error("Greška pri preuzimanju sastojaka:", error);
            }
        };

        fetchData();
    }, [id]);

    if (!receptSastojci) {
        return <p>Učitavanje...</p>;
    }

  return (
    <div className='sastojak-display' id='sastojak-display'>
      <div className="sastojak-display-list">
                {receptSastojci.map((receptSastojak, index) => {
                    const item = sastojci_list.find(sastojak => sastojak.id === receptSastojak.id);
                    return (
                        item && (
                            <SastojakCard
                                key={index}
                                id={item.id}
                                name={receptSastojak.naziv}
                                unit={receptSastojak.merna_jedinica}
                                imgSrc={item.imgSrc}
                                price={200}
                                userRole={userRole}
                            />
                        )
                    );
                })}
      </div>
    </div>
  )
}

export default SastojakDisplay