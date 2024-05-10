import { useEffect, useState } from 'react'
import './App.scss'
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

			const temp = await fetch(`https://api.jikan.moe/v4/top/anime?type=tv&limit=10&page=` + currentPage)
				.then(res => res.json());
			setTotalPages(temp.pagination.items.total)
			setAnimeList(temp.data);
			return
		}
		fetchAnime(search, currentPage,generateGenreString())
	}

	const handleSearch =(query) => {
			fetchAnime(query,1,generateGenreString());    
		
	}

	const fetchAnime =  async (query, currentPage,genreString) => {
		let selectedPage = page;
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
		const temp = await fetch(`https://api.jikan.moe/v4/anime?`+(query!=''?`q=${query}&`:'')+`order_by=title&sort=asc&limit=10&sfw=true&page=${selectedPage}`+(genreString!=''&&genreString!=undefined?`&genres=${genreString}`:''))
			.then(res => res.json());
		setAnimeList(temp.data);
		setTotalPages(temp.pagination.items.total)
	}

	useEffect(() => {
		getGenres()
		GetTopAnime(page);
		
	}, []);
	const getGenres = async  () =>{

		const temp = await fetch(`https://api.jikan.moe/v4/genres/anime?filter=genres`)
			.then(res => res.json());
			let tempGenres = temp.data?.map(tempGenre => ({ ...tempGenre, checked: false }))
			setGenres(tempGenres)
	}

	const generateGenreString = ()=>{
		let temp = genres.filter(tempGenre => tempGenre?.checked).map(tempGenre=>tempGenre?.mal_id).toString()
		return temp
	}
	const applyFilters = () =>{
		setPage(1)
		setSelectedGenres(generateGenreString())
		fetchAnime(search,1,generateGenreString())

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
