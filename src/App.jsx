import { useCallback, useEffect, useState } from 'react'
import './App.css'
import List from './List'
import SearchBar from './SearchBar'
import Genres from './Genres';

function App() {

	const [animeList, setAnimeList] = useState([]);
	const [page, setPage] = useState(1);
	const [totalpages, setTotalPages] = useState(0)
	const [search, SetSearch] = useState("");
	const [genres, setGenres] = useState([]);

	// State with list of all checked item
	const [selectedGenres, setSelectedGenres] = useState("");


	const GetTopAnime =  async (currentPage) => {
		if (generateGenreString()==''&&search === '') {
			console.log(currentPage)
			const temp = await fetch(`https://api.jikan.moe/v4/top/anime?type=tv&limit=10&page=` + currentPage)
				.then(res => res.json());
			console.log(temp)
			setTotalPages(temp.pagination.last_visible_page)
			setAnimeList(temp.data);
			return
		}
		FetchAnime(search, currentPage,generateGenreString())
	}

	const handleSearch =(query) => {

			console.log("HOLA",generateGenreString())
			console.log("HOLA",query)
			FetchAnime(query,1,generateGenreString());    
		
	}

	const FetchAnime =  async (query, currentPage,genreString) => {
		let selectedPage = page;
		console.log(`https://api.jikan.moe/v4/anime?`+(query!=''?`q=${query}&`:'')+`order_by=title&sort=asc&limit=10&sfw=true&page=${selectedPage}`+(genreString!=''?`&genres=${genreString}`:''))
	    console.log(!query.trim()&&!genreString.trim())
		if (!query.trim()&&!genreString.trim()) {
			GetTopAnime(page)
			return
		}
		
		if (currentPage == undefined) {
			setPage(1)
		}
		if (currentPage !== undefined) {
			selectedPage = currentPage
		}
		console.log(`https://api.jikan.moe/v4/anime?`+(query!=''?`q=${query}&`:'')+`order_by=title&sort=asc&limit=10&sfw=true&page=${selectedPage}`+((genreString!=''&&genreString!=undefined)?`&genres=${genreString}`:''))
		const temp = await fetch(`https://api.jikan.moe/v4/anime?`+(query!=''?`q=${query}&`:'')+`order_by=title&sort=asc&limit=10&sfw=true&page=${selectedPage}`+(genreString!=''&&genreString!=undefined?`&genres=${genreString}`:''))
			.then(res => res.json());
		setAnimeList(temp.data);
		setTotalPages(temp.pagination.last_visible_page)
	}

	useEffect(() => {
		getGenres()
		GetTopAnime(page);
		
	}, []);
	const getGenres = async  () =>{

		const temp = await fetch(`https://api.jikan.moe/v4/genres/anime?filter=genres`)
			.then(res => res.json());
			
			let tempGenres = temp.data?.map(tempGenre => ({ ...tempGenre, checked: false }))
			console.log(temp.data)
			setGenres(tempGenres)
	}

	const generateGenreString = ()=>{
		let temp = genres.filter(tempGenre => tempGenre?.checked).map(tempGenre=>tempGenre?.mal_id).toString()
		console.log("filtrado",temp)
		return temp
	}
	const applyFilters = () =>{
		setSelectedGenres(generateGenreString())
		FetchAnime(search,1,generateGenreString())
	}
	return (
		<>
			<div className='header'>
				<label className='title'>My List</label>
				<SearchBar handleSearch={handleSearch}
					search={search}
					SetSearch={SetSearch} />
			</div>
			<div className='container'>
			<Genres genres={genres} setGenres={setGenres} applyFilters={applyFilters}/>
			<List animes={animeList} page={page} setPage={setPage} getData={GetTopAnime} totalPages={totalpages}>
			</List>
			</div>
		</>
	)
}

export default App
