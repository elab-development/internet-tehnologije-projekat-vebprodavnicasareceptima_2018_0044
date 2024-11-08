import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';

const ReceptPage = () => {
    const { id } = useParams(); // Uzima ID iz URL-a
    const [recept, setRecept] = useState(null);

    const styles = {
        container: {
            display: 'flex',
            alignItems: 'flex-start',  // Poravnanje na vrh
            gap: 20+'px',               // Razmak između slike i sadržaja
            padding: 20+'px'
        },
        image: {
            width: '650px',            // Širina kvadrata
            height: '450px',           // Visina kvadrata, jednaka širini da bi bio kvadrat
            objectFit: 'cover',        // Crop-uje sliku da ispuni kvadrat
            borderRadius: '5px'        // Zaobljeni uglovi
        },
        content: {
            flex: 1                    // Sadržaj zauzima ostatak prostora
        }
      };

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

    if (!recept) {
        return <p>Učitavanje...</p>;
    }

    return (
        <div>
            <div style={styles.container}>
            <img src={assets.recept_1} alt='' style={styles.image} />
            <h1>{recept.naziv}</h1>
           {/*} <img src={recept.image} alt={recept.title} />   Kako da se dodaju pojedinacne slike dinamicki? Proslediti mozda ili u folderu ih nazvati po id-ju??*/}
            <p>{recept.opis}</p>
            {/*<h3>Sastojci:</h3>
            <ul>
                {recept.ingredients.map((sastojak, index) => (
                    <li key={index}>{sastojak.name}</li>
                ))}
            </ul> */}
            </div>
        </div>
    );
};

export default ReceptPage;
