import { useCallback, useEffect, useState } from 'react'
import { DNA,Hourglass } from 'react-loader-spinner'

import Genres from './Genres'
import List from './List'
import SearchBar from './SearchBar'

import './App.scss'

function App() {

	const [animeList, setAnimeList] = useState([]);
	const [page, setPage] = useState(1);
	const [totalItems, setTotalItems] = useState(0)

	const [loading, setLoading] = useState(false)

	const [loadingGenres, setLoadingGenres] = useState(false)

	const [search, SetSearch] = useState("");
	const [genres, setGenres] = useState([]);

	// State with list of all checked item
	const [selectedGenres, setSelectedGenres] = useState("");

    const URL_ANIME_API = `https://api.jikan.moe/v4/`
	const GetTopAnime =  useCallback(async (currentPage) => {
		setLoading(true)
		if (generateGenreString()==''&&search === '') {

			const temp = await fetch(`${URL_ANIME_API}top/anime?type=tv&limit=10&page=` + currentPage)
				.then(res => res.json());
			setTotalItems(temp.pagination?.items?.total)
			setAnimeList(temp?.data);
			setLoading(false)
			return
		}
		fetchAnime(search, currentPage,generateGenreString())
	},[animeList,search])

	const handleSearch = (query) => {
		fetchAnime(query, 1, generateGenreString());
	}

	const fetchAnime = useCallback( async (query, currentPage,genreString) => {
		setLoading(true)
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
		const queryString = query!=''?`q=${query}&`:''
		const genrestoSend = genreString!=''&&genreString!=undefined?`&genres=${genreString}`:''
		const url = `${URL_ANIME_API}anime?${queryString}order_by=title&sort=asc&limit=10&sfw=true&page=${selectedPage}${genrestoSend}`
		const temp = await fetch(url)
			.then(res => res.json());
		setAnimeList(temp.data);
		setTotalItems(temp.pagination?.items?.total)
		setLoading(false)
	},[animeList])

	useEffect(() => {
		getGenres()
		GetTopAnime(page);
		
	}, []);
	const getGenres = async  () =>{
		setLoadingGenres(true)
		const temp = await fetch(`${URL_ANIME_API}genres/anime?filter=genres`)
			.then(res => res.json());
			let tempGenres = temp.data?.map(tempGenre => ({ ...tempGenre, checked: false }))
			setGenres(tempGenres)
			setLoadingGenres(false)
	}

	const generateGenreString = ()=>{
		
		let temp = genres!=undefined&&genres.length>0?genres.filter(tempGenre => tempGenre?.checked).map(tempGenre=>tempGenre?.mal_id).toString():''
		
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
			
				{!loadingGenres ?
					<Genres genres={genres} setGenres={setGenres} applyFilters={applyFilters} />
					:
					<div className="loading-container-genres">
						<Hourglass
							visible={true}
							height="80"
							width="80"
							ariaLabel="hourglass-loading"
							wrapperStyle={{}}
							wrapperClass=""
							colors={['#306cce', '#72a1ed']}
						/>
					</div>
				}
				{!loading ?
					<List animes={animeList} page={page} setPage={setPage} getData={GetTopAnime} totalItems={totalItems}>
					</List>
					:
					<div className="loading-container">
						<DNA
							visible={true}
							height="380"
							width="380"
							ariaLabel="puff-loading"
							wrapperStyle={{}}
							wrapperClass=""

						/>
					</div>
			}
			</div>
		</>
	)
}

export default App
