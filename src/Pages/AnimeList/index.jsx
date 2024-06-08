import { useCallback, useEffect, useState } from 'react'
import { DNA,Hourglass } from 'react-loader-spinner'

import Genres from './Genres'
import List from './List'
import SearchBar from './SearchBar'
import { URL_ANIME_API } from '../../Constants'

import './styles.scss'

function AnimeList({setSelectedAnime,setIsAnimeSelected,animeList, setAnimeList,page, setPage,totalItems, setTotalItems,search, SetSearch,genres, setGenres,selectedGenres, setSelectedGenres}) {

	const [loading, setLoading] = useState(false)

	const [loadingGenres, setLoadingGenres] = useState(false)

	const GetTopAnime =  useCallback(async (currentPage) => {
		setLoading(true)
		if (generateGenreString()==''&&search === '') {

			const temp = await fetch(`${URL_ANIME_API}top/anime?type=tv&limit=10&page=` + currentPage)
				.then(res => res.json())
			if(temp?.status==429){
				setLoading(false)
				return
			}
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
		if(temp?.status==429){
			setLoading(false)
			return
		}
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
			if(temp?.status==429){
				setLoadingGenres(false)
				return
			}
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
				<label className='title'>My Anime Database</label>
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
					<List 
						animes={animeList} 
						page={page} 
						setPage={setPage} 
						getData={GetTopAnime} 
						totalItems={totalItems} 
						setSelectedAnime={setSelectedAnime} 
						setIsAnimeSelected={setIsAnimeSelected}/>
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

export default AnimeList
