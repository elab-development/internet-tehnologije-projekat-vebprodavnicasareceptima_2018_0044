import React, {useState, useEffect} from 'react'
import './Pagination.css'

const Pagination = ({niz, setThisPageItems}) => {
    const [currentPage, setCurrentPage]=useState(1);
    const [itemsPerPage,setItemsPerPage]=useState(8); 
    const lastItemIndex = currentPage*itemsPerPage;
    const firstItemIndex = lastItemIndex-itemsPerPage;
    const pages = []
    
    for (let i = 1; i <= Math.ceil(niz.length / itemsPerPage); i++) {
        pages.push(i);
    }
    
    useEffect(() => {
        setThisPageItems(niz?.slice(firstItemIndex, lastItemIndex));
      }, [currentPage, niz, firstItemIndex, lastItemIndex, setThisPageItems]);

  return (
    <div className="pagination-container flex">
        <span>Prikazano {niz?.slice(firstItemIndex, lastItemIndex).length} od {niz.length} rezultata</span>
        <nav className='pagination'>
        {
          pages.map((item,index)=>{
          return(
            // za paginaciju prosledi thisPageItems
            <button onClick={() => setCurrentPage(item)} key={index} className={`pagination-btn ${item === currentPage ? 'active' : ''}`}>
                {item}</button>      
           )
        })
        }
        </nav>
    </div> 
  )
}

export default Pagination