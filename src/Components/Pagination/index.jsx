import React from 'react'

import './styles.scss'
import { DOTS, usePagination } from '../../Hooks/usePagination'

const Pagination = ({ totalPages, page,setPage,getData }) => {
    const paginationRange = usePagination({
        currentPage:page,
        totalCount:totalPages,
        siblingCount:1,
        pageSize:10
      })


    const nextPage = () => {
            if((totalPages/10)>page){
                setPage(prev=>prev+1); 
                getData(page + 1);
            } 
    }
    const prevPage = () => {
        if(page !== 1){
            setPage(prev=>prev-1); 
            getData(page - 1);
        } 
    }
    return (
        <nav>
            <ul className='pagination-container justify-content-center'>
                <li >
                    <button className="pagination-item page-link previous" 
                        onClick={prevPage} 
                       >
                        
                        Previous
                    </button>
                </li>
                {paginationRange.map((pageNumber,index) => {
                    
                    if (pageNumber === DOTS) {
                        return <li key={index+pageNumber+index}className="pagination-item dots">&#8230;</li>;
                      }
              
                      return (
                        <li key={pageNumber} className={`pagination-item ${page==pageNumber?'selected':''}`}
                          onClick={() => {  setPage(pageNumber);  getData(pageNumber);}}
                        >
                          {pageNumber}
                        </li>
                      );
                })}
                <li >
                    <button className="pagination-item page-link next" 
                        onClick={nextPage}
                        >
                        
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    )
}


export default Pagination