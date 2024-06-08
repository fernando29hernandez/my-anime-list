import { useState } from 'react'

import './App.scss'
import AnimeInfo from './Pages/AnimeInfo'
import AnimeList from './Pages/AnimeList'

function App() {

	const [selectedAnime,setSelectedAnime] = useState({});

	const [isAnimeSeleted,setIsAnimeSelected] = useState(false);
	return (
		<>
		{isAnimeSeleted?
			<AnimeInfo setIsAnimeSelected={setIsAnimeSelected} anime={selectedAnime}/>
		:
			<AnimeList setSelectedAnime={setSelectedAnime} setIsAnimeSelected={setIsAnimeSelected}/>
		}
		</>
	)
}

export default App
