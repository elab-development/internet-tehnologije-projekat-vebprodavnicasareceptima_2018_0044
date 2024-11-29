import React, { useContext, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
  

const NajcesciSastojciChart = () => {
    
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const [chartData, setChartData] = useState(null);
    const {token} = useContext(StoreContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/statistika/sastojci',{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const labels = response.data.map(item => item.naziv); 
                const data = response.data.map(item => item.broj_dodavanja);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Broj dodavanja sasatojka u korpu', 
                            data, 
                            backgroundColor: 'rgba(75, 192, 192, 0.6)', 
                        },
                    ],
                });
            } catch (error) {
                console.error('Greška pri preuzimanju podataka:', error);
            }
        };

        fetchData();
    }, []); //poziva pri ucitavanju

    if (!chartData) {
        return <p>Učitavanje grafikona...</p>; 
    }

    return <Bar data={chartData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />; 
};

export default NajcesciSastojciChart;
