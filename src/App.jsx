import { useState } from 'react'

import './App.scss'
import AnimeInfo from './Pages/AnimeInfo'
import AnimeList from './Pages/AnimeList'

function App() {

	const [selectedAnime,setSelectedAnime] = useState({});

	const [isAnimeSeleted,setIsAnimeSelected] = useState(false);

	const [animeList, setAnimeList] = useState([]);

	const [page, setPage] = useState(1);
	const [totalItems, setTotalItems] = useState(0)

	

	const [search, SetSearch] = useState("");
	const [genres, setGenres] = useState([]);

	// State with list of all checked item
	const [selectedGenres, setSelectedGenres] = useState("");

	return (
		<>
		{isAnimeSeleted?
			<AnimeInfo setIsAnimeSelected={setIsAnimeSelected} anime={selectedAnime}/>
		:
			<AnimeList 
				setSelectedAnime={setSelectedAnime} 
				setIsAnimeSelected={setIsAnimeSelected}
				animeList={animeList}
				setAnimeList={setAnimeList}
				page={page}
				setPage={setPage}
				totalItems={totalItems}
				setTotalItems={setTotalItems}
				search={search}
				SetSearch={SetSearch}
				genres={genres}
				setGenres={setGenres}
				selectedGenres={selectedGenres}
				setSelectedGenres={setSelectedGenres}/>
		}
		</>
	)
}

export default App
