import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './ReceptPage.css'
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { StoreContext } from '../context/StoreContext';
import SastojakDisplay from '../components/SastojakDisplay';

const ReceptPage = () => {
    const { id } = useParams(); // Uzima ID iz URL-a
    const [recept, setRecept] = useState(null);
    const{recepti_list,updateCartItems,userRole,token} = useContext(StoreContext);
    const baseUrl = "http://localhost:8000/storage/";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/recepti/${id}`, {
                    headers: { 'Content-Type': 'application/json' }
                });
                setRecept(response.data.data); //!!Ugnjezdeno 
                console.log("Podaci o receptu:", response.data.data);
            } catch (error) {
                console.error("Greška pri preuzimanju recepta:", error);
            }
        };

        fetchData();
    }, [id]);
   
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

     function handleAddAll() {
        let config = {
            method: 'post',
            url: `http://localhost:8000/api/korpa/recept/${id}`,
            headers: { 
              Authorization: `Bearer ${token}`
            }
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            updateCartItems(token)
          })
          .catch((error) => {
            console.log(error);
          });
     }

    if (!recept) {
        return <p>Učitavanje...</p>;
    }

    return (
        <div className='recept-page'>
            <div className="container-top">            
                <div className="container-left ">
                        <img src={recept?.slika || recepti_list?.[id-1]?.recept_image || assets.logo} alt="" />                    
                </div>
                <div className="container-right">
                    <h2>{recept.naziv}</h2>
                    <div className="container-right-tags flex1">
                        <button>#{recept.kategorija.naziv}</button>
                        <button>#{recept.kuhinja.naziv}</button>
                        <button>#{recept.vrsta_obroka}</button>
                    </div>
                    <div className="container-right-key-info">
                        <h4>Vreme pripreme: {recept.vreme_pripreme}min</h4>
                        <h4>Broj porcija: {recept.broj_porcija}</h4>
                    </div>
                    <p>{recept.opis}</p>
                    <h3>Nacin pripreme:</h3>
                    <p>{recept.nacin_pripreme}</p>
                </div>
            </div>
            <div className="sastojci-list">
                <div className="sastojci-list-title flex">
                    <h3>Sastojci na dohvat ruke:</h3>
                    {userRole === "user" && (
                    <button onClick={handleAddAll}>Dodaj sve</button>
                    )}
                </div>
                <SastojakDisplay sastojci={receptSastojci} userRole={userRole} token={token}/>
            </div>
        </div>
    );
};

export default ReceptPage;
