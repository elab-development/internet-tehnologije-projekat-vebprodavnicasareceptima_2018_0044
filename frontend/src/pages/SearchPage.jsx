import React, { useContext, useState,useEffect } from 'react'
import './SearchPage.css'
import { BiSearch } from "react-icons/bi";
import SastojakDisplay from '../components/SastojakDisplay';
import ReceptDisplay from '../components/ReceptDisplay';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';

const SearchPage = () => {

    const{kategorija_list, vrste_obroka,userRole,token} =useContext(StoreContext);
    const [listaRecepata, setlistaRecepata] = useState([]);
    const [kuhinje, setKuhinje] = useState([]);
    const [sastojci, setSastojci] = useState([]);
    const [parametri, setParametri] = useState(null);

    //Radio button
    const [selectedRadio, setSelectedRadio] = useState('sastojak');
    const handleRadioChange = (event) => {
        setSelectedRadio(event.target.value);
        // setSearchQuery('')
        setlistaRecepata([])
        setSastojci([])
        setThisPageItems([])
    };

    //kriterijumi filtriranja za recept
    const [selectedKategorija, setSelectedKategorija] = useState(null);
    const [selectedKuhinja, setSelectedKuhinja] = useState(null);
    const [selectedVrstaObroka, setSelectedVrstaObroka] = useState(null);
    


    //Pretraga i sortiranje
      let navigate = useNavigate();
      const [searchQuery, setSearchQuery] = useState('');
      const handleSearchClick = () => {
        if (searchQuery.trim()) {
          navigate(`/filter?naziv=${searchQuery}`);
          setSearchQuery('');
        }
    }; 
    
    const location = useLocation();
    const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const naziv = params.get('naziv');
        setParametri(naziv);

        if (naziv) {
            const fetchPodaciPretrage = async () => {
                try {
                    let url = '';
                    if (selectedRadio === 'sastojak') {
                        url = `/api/sastojak/pretraga?naziv=${naziv}`;
                    } else {
                        url = `/api/recept/pretraga?naziv=${naziv}`;
                    }
    
                    if (sortBy) {
                        url += `&sort=${sortBy}`;
                    }
    
                    const response = await axios.get(url);
    
                    if (selectedRadio === 'sastojak') {
                        setSastojci(response.data.data);
                    } else {
                        setlistaRecepata(response.data.data);
                    }
    
                    console.log(response.data);
                } catch (error) {
                    console.error("Greška pri preuzimanju podataka:", error);
                }
            };

            fetchPodaciPretrage();
        }
    }, [location.search,sortBy,selectedRadio]);

    useEffect(() => {
        setParametri(null);
        const fetchPodaciPretrage = async () => {
            try {
                const filterParams = new URLSearchParams();
                
                if (selectedKategorija) filterParams.append('kategorija_id', selectedKategorija);
                if (selectedKuhinja) filterParams.append('kuhinja_id', selectedKuhinja);
                if (selectedVrstaObroka) filterParams.append('vrsta_obroka', selectedVrstaObroka);
                
                if (filterParams.toString()) {
                    const response = await axios.get(`/api/recepti/filter?${filterParams.toString()}`);
                    setlistaRecepata(response.data.data);  
                    console.log(response.data.data);  
                } else {
                    setlistaRecepata([]); 
                    console.log("Nema filtera za pretragu");
                }
            } catch (error) {
                console.error("Greška pri preuzimanju podataka:", error);
            }
        };
    
        fetchPodaciPretrage();
    }, [selectedKategorija, selectedKuhinja, selectedVrstaObroka]);

    //Paginacija
    const [thisPageItems, setThisPageItems] = useState([]);

    // lista kuhinja
    useEffect(() => {
        let config = {
        method: 'get',
        url: 'http://localhost:8000/api/kuhinje',
        headers: { }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setKuhinje(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);

  return (
    <div className='filter-page' id='filter-page'>       
        <div className="main-page">
            <h1 className="title">Pretrazite sastojke i recepte</h1>
            <div className="main-page-container wide">
                <div className="filter-sidebar">
                    <div className="category-content">
                        <div className="wrap">
                            <div className="sidebar-content">
                                <div className="sidebar-title">Filter</div>
                                <div className="widget">
                                    <div className="summary">
                                        <span className='span-search'>Pretrazi</span>                                       
                                        <div className="search-bar-container">
                                            <div className="search-bar-buttons-container">
                                                <div className="search-bar-buttons">
                                                    <input type="radio" name='radio-type-search' id='radio-sastojak' 
                                                    value="sastojak" checked={selectedRadio === 'sastojak'} onChange={handleRadioChange}/>
                                                    <label className='radio-search-label' htmlFor="radio-sastojak">Sastojak</label>
                                                </div>
                                                <div className="search-bar-buttons">
                                                    <input type="radio" name='radio-type-search' id='radio-recept' value="recept"
                                                    checked={selectedRadio === 'recept'} onChange={handleRadioChange}/>
                                                    <label className='radio-search-label' htmlFor="radio-recept">Recept</label>
                                                </div>
                                            </div>
                                            <div className="search-bar">
                                                <input type="text" className='search-box' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                                                <BiSearch className='search-icon' onClick={handleSearchClick}/>
                                            </div>
                                            <div className="search-sort">
                                                <div className="summary ">
                                                    <span>Sortiraj po</span>
                                                    <select 
                                                        className="sort-dropdown" 
                                                        onChange={(e) => setSortBy(e.target.value)} 
                                                        value={sortBy}>
                                                        <option value="">Izaberite:</option>
                                                        <option value="naziv_asc">Naziv (A-Z)</option>
                                                        <option value="naziv_desc">Naziv (Z-A)</option>
                                                        <option value="datum_desc">Najnoviji</option>
                                                        <option value="datum_asc">Najstariji</option>
                                                    </select>
                                                </div>
                                            </div>                                               
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <h4>Filtriraj recepte</h4>
                                <div className="widget">
                                    <div className="summary">
                                        <input type="checkbox" name='nesto' id='aab'/>
                                        <label htmlFor="aab">
                                        <span>Kategorije</span>
                                        <i className="arrow-down-s-line">⌄</i>
                                        </label>
                                        <div className="list-block kategorije scroll-to">
                                            <ul className="list-block-container">
                                                {kategorija_list && (kategorija_list.map((item)=> {
                                                    return <li key={item.id}><a className={selectedKategorija === item.id ? 'active' : ''} href="#" onClick={() => setSelectedKategorija(selectedKategorija === item.id ? null : item.id)}>{item.kat_name}</a></li>;                                                   
                                                }))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="widget">
                                    <div className="summary">
                                        <input type="checkbox" name='nesto' id='aac' />
                                        <label htmlFor="aac">
                                        <span>Kuhinje</span>
                                        <i className="arrow-down-s-line">⌄</i>
                                        </label>
                                        <div className="list-block kuhinje scroll-to">
                                            <ul className="list-block-container">
                                            {kuhinje && (kuhinje.map((item)=> {
                                                    return <li key={item.id}><a className={selectedKuhinja === item.id ? 'active' : ''} href="#"onClick={() => setSelectedKuhinja(selectedKuhinja === item.id ? null : item.id) }>{item.naziv}</a></li>;                                                   
                                                }))}                                   
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="widget">
                                    <div className="summary">
                                        <input type="checkbox" name='nesto' id='aad'/>
                                        <label htmlFor="aad">
                                        <span>Vrste obroka</span>
                                        <i className="arrow-down-s-line">⌄</i>
                                        </label>
                                        <div className="list-block vrste-obroka">
                                            <ul className="list-block-container">
                                                {vrste_obroka && (vrste_obroka.map((item)=> {
                                                    return <li key={item.name}><a className={selectedVrstaObroka === item.name ? 'active' : ''} href={''} onClick={(e) => {e.preventDefault(); setSelectedVrstaObroka(selectedVrstaObroka === item.name ? null : item.name);}}>{item.name}</a></li>;                                                   
                                                }))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="category-content">
                    {
                        parametri!=null && ( selectedRadio==='sastojak'? (
                            <>
                            <div className="sastojci-display-grid">
                                <h4>Rezultati pretrage za "{parametri}"</h4>
                                 <SastojakDisplay sastojci={thisPageItems} userRole={userRole} token={token} recepti={listaRecepata} setRecepti={setlistaRecepata}/>
                                 <Pagination niz={sastojci} setThisPageItems={setThisPageItems}/>
                            </div>
                                { listaRecepata!==null&&(
                                    <div className="recepti-display-grid">
                                        <hr />
                                        <p>Recepti u kojima se upotrebljava sastojak</p>
                                        <ReceptDisplay recepti={listaRecepata}/>
                                    </div>
                                    )
                                }
                            </>
                        ) : (
                            <div className="recepti-display-grid"> 
                                <h4>Rezultati pretrage za "{parametri}"</h4>
                                <ReceptDisplay recepti={thisPageItems} />
                                <Pagination niz={listaRecepata} setThisPageItems={setThisPageItems}/>
                            </div>
                        ))
                    }  
                    {
                        parametri===null  && selectedRadio === 'sastojak' && (
                            <div className="recepti-display-grid"> 
                                        <ReceptDisplay recepti={thisPageItems} />
                                        <Pagination niz={listaRecepata} setThisPageItems={setThisPageItems}/>
                            </div> 
                        )
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchPage