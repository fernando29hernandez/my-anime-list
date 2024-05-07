import { useCallback, useEffect, useState } from 'react'
import './styles.scss'


function Genres({genres,setGenres,applyFilters}) {

  
	// Add/Remove checked item from list
	const handleCheck = (index) => {
	 
      setGenres(
        genres.map((genre, currentIndex) =>
          currentIndex === index
            ? { ...genre, checked: !genre.checked }
            : genre
        ))
	};
	  
  
    const removeFilters = ()=>{
        setGenres(genres.map(genre=> ({ ...genre, checked: false })))
    }
	return (
        <div className="app">
            
            <div className='header-container'>
                <div className="title">Genres:</div>
                <button className='filter-button' onClick={removeFilters}>
                    Remove Filters 
                </button>
                <button className='filter-button' onClick={applyFilters} >
                    Apply Filters
                </button>
            </div>
            <div className="checkList">
                <div className="list-container">
                    {genres!=undefined && genres.length > 0 ? genres.map((item, index) => (
                        <label key={index}>
                            <input checked={item.checked} type="checkbox" onChange={()=>handleCheck(index)} />
                            <span className={item.checked? "checked-item" : "not-checked-item"}>{item.name}</span>
                        </label>
                    )) : <></>}
                </div>
            </div>
        </div>

	)
}

export default Genres