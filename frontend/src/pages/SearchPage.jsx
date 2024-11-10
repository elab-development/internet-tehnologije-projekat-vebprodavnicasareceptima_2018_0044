import React, { useState } from 'react'
import './SearchPage.css'
import { BiSearch } from "react-icons/bi";
import SastojakDisplay from '../components/SastojakDisplay';
import ReceptDisplay from '../components/ReceptDisplay';

const SearchPage = () => {
    const [listaRecepata, setlistaRecepata] = useState([]);
    const [currentPage, setCurrentPage]=useState(1);
    const [itemsPerPage,setItemsPerPage]=useState(10); 

    const lastItemIndex = currentPage*itemsPerPage;
    const firstitemIndex = lastItemIndex-itemsPerPage;
    const thisPageItems = listaRecepata.slice(firstitemIndex,lastItemIndex)
    const pages = []

    for (let i = 1; i < listaRecepata.length/itemsPerPage; i++){
        pages.push(i);       
    }

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
                                                    <input type="radio" name='radio-type-search' id='radio-recept'/>
                                                    <label className='radio-search-label' htmlFor="radio-recept">Recept</label>
                                                </div>
                                                <div className="search-bar-buttons">
                                                    <input type="radio" name='radio-type-search' id='radio-sastojak'/>
                                                    <label className='radio-search-label' htmlFor="radio-sastojak">Sastojak</label>
                                                </div>
                                            </div>
                                            <div className="search-bar">
                                                <input type="text" className='search-box'/>
                                                <BiSearch className='search-icon'/>
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
                                                {/* map: ucitaj listu kategorija */}
                                                <li><a href="#">Predjela</a></li>
                                                <li><a href="#">Glavna jela</a></li>
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
                                                {/* map: ucitaj listu kuhinja */}
                                                <li><a href="#">Italijanska</a></li>
                                                <li><a href="#">Italijanska</a></li>
                                                <li><a href="#">Italijanska</a></li>
                                                <li><a href="#">Italijanska</a></li>
                                                <li><a href="#">Italijanska</a></li>
                                                <li><a href="#">Italijanska</a></li>
                                               
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
                                                {/* map: ucitaj listu kuhinja */}
                                                <li><a href="#">Dorucak</a></li>
                                                <li><a href="#">Brunc</a></li>
                                                <li><a href="#">Rucak</a></li>
                                                <li><a href="#">Vecera</a></li>
                                                <li><a href="#">Uzina</a></li>
                                                <li><a href="#">Desert</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="category-content">
                    <div className="sastojci-display-grid">
                        <SastojakDisplay/>
                        {/* Prikazuje ako je sastojak oznacen i trazen preko, nisam uradila api rutu za ovo*/}
                    </div>
                    <hr />
                    <div className="recepti-display-grid">
                        <ReceptDisplay/>
                        {/* Prikazuje ako je recept oznacen i trazen preko imena, nisam uradila api rutu za ovo isto ako je nesto od kategorija cekirano
                        ako trazim preko imena onda bih da odcekiram sve kategorije*/}
                        {/*za paginaciju prosledi thisPageItems*/}
                    </div>
                    <div className="pagination-container">
                        <span>Prikazano {} od {} rezultata</span> {/*Da li zadrzati?*/}
                        <nav className='pagination'>
                            {
                                pages.map((item,index)=>{
                                    return(
                                        <button onClick={()=> setCurrentPage(item)} key={index} className='pagination-btn'>{item}</button>
                                    )

                                })
                            }
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchPage