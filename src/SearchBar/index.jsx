import React from 'react'
import './styles.scss'

function SearchBar(props) {
	return (

			<div className="main-head">
				<div 
					className="search-box"
					>
					<input 
						type="search"
						placeholder="Search for an anime..."
						value={props.search}
						onChange={e => props.SetSearch(e.target.value)} onKeyDown={(e)=>{
							console.log(e.code)
							if(e.code === 'Enter') {
								props.SetSearch(e.target.value)
								props.handleSearch(e.target.value)
							}
						}} />
						
				</div>
			</div>

	)
}

export default SearchBar