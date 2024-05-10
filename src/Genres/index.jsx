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
	  
  
    const removeFilters = async ()=>{
        setGenres(genres.map(genre=> ({ ...genre, checked: false })))
        setTimeout(()=>{
            applyFilters()
        },2000)  
    }
	return (
        <div className="app-genre">
            
            <div className='header-container'>
                <div className="title">Genres:</div>
                <button className='filter-button' onClick={removeFilters}>
                    Remove Filters 
                </button>
                <button className='filter-button' onClick={applyFilters} >
                    Apply Filters
                </button>
            </div>
            
                <div className="list-container">
                    {genres!=undefined && genres.length > 0 ? genres.map((item, index) => (
                        <label className="checkList" key={index}>
                            <input checked={item.checked} type="checkbox" onChange={()=>handleCheck(index)} />
                            <span className={item.checked? "checked-item" : "not-checked-item"}>{item.name}</span>
                        </label>
                    )) : <></>}
                </div>
            
        </div>

	)
}

export default Genres