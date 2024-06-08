import React, { useEffect, useState } from 'react';

import './styles.scss'
import BackArrow from './BackArrow';
import { Hourglass } from 'react-loader-spinner';

const AnimeInfo = ({ anime,setIsAnimeSelected }) => {

    const URL_ANIME_API = `https://api.jikan.moe/v4/`

    const [characters,setCharacters] = useState([])

    const [episodes,setEpisodes] = useState([])
    const handleFlip = () => {
        setIsAnimeSelected(false)
    }

    const getCharacters = async () => {

        const temp = await fetch(`${URL_ANIME_API}anime/${anime?.mal_id}/characters`)
            .then(res => res.json());
            setCharacters(temp.data)
    }

    const getEpisodes = async () => {

        const temp = await fetch(`${URL_ANIME_API}anime/${anime?.mal_id}/episodes`)
            .then(res => res.json());
            setEpisodes(temp.data)


    }

    useEffect(() => {
        getCharacters();
        getEpisodes();

    }, [])

    return (

      
        <div className='anime-container' >
            <div className='button-container'>
                        <button className='info-button' onClick={handleFlip}>
                           <BackArrow /> <div className="icon-style">Back</div>
                        </button>

            </div>
            <h3 className='anime-title'>{anime.title}</h3>
            <article className="anime-info-box">


                <div className='side-area'>
                    <div
                        href={''}
                        target="_blank"
                        rel="noreferrer">
                        <figure>
                            <img
                                src={anime.images.jpg.large_image_url}
                                alt="Anime Image" />
                        </figure>

                    </div>
                    <div className='property'>
                        <b>Episodes:</b> {anime?.episodes}
                    </div>
                    <div className='property'>
                        <b> Status:</b>  {anime?.status}
                    </div>
                    <div className='property'>
                        <b>   Duration:</b>  {anime?.duration}
                    </div>
                    <div className='property'>
                        <b>   Studio:</b>  {anime?.studios[0]?.name}
                    </div>
                    <div className='property'>
                        <b>  Demography:</b>  {anime?.demographics[0]?.name}
                    </div>
                    <div className='property'>
                        <b>  Rating:</b>  {anime?.rating}
                    </div>
                    <div className='property'>
                        <b>  Type:</b>  {anime?.type}
                    </div>
        {/**
         * <div className='property'>
                        <b>  Trailer:</b> <a href={anime?.trailer?.url}>{anime?.trailer?.url}</a>
                    </div>
         */}
                    
                </div>
                <div className='info-area'>

                    <div className='score-info'>
                        <div className='rank'>
                            <b>  Rank:</b>  {anime?.rank}
                        </div>
                        <div className='score'>
                            <b>  Score:</b>  {anime?.score}
                        </div>
                        <div className='popularity'>
                            <b>  Popularity:</b>  {anime?.popularity}
                        </div>
                    </div>
                    <div className='synopsis'>
                        <b>Synopsis:</b> {anime?.synopsis}
                    </div>

                    <div className='character-title'>
                        <b>Trailer:</b> 
                    </div>

                    <div className="episode-list">
                        <iframe
                        width="853"
                        height="480"
                        src={anime?.trailer?.embed_url}
                        frameBorder="0"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                        />
                    </div>
                    <div className='character-title'>
                        <b>Character and Voice Actors:</b> 
                    </div>
                    
                    <div className='character-list'>

                        {characters?.length > 0 ?
                            characters.map((item, index) => {
                                return <div key={index} className='character-item'>
                                    <div className='character-info'>
                                        <div
                                            href={''}
                                            target="_blank"
                                            rel="noreferrer">
                                            <figure className='character-figure'>
                                                <img className='character-img'
                                                    src={item?.character?.images.jpg.image_url}
                                                    alt="Anime Image" />
                                            </figure>

                                        </div>
                                        <div className='character-name'>
                                            {item?.character?.name}
                                        </div>
                                        <div className='additional-character-name-info'>
                                            {item?.role}
                                        </div>
                                    </div>
                                    {item?.voice_actors[0] ?
                                        <div className='character-voice-info'>
                                            <div
                                                href={''}
                                                target="_blank"
                                                rel="noreferrer">
                                                <figure className='character-figure'>
                                                    <img className='character-img'
                                                        src={item?.voice_actors[0]?.person?.images.jpg.image_url}
                                                        alt="Anime Image" />
                                                </figure>

                                            </div>
                                            <div className='character-name'>
                                                {item?.voice_actors[0]?.person?.name}
                                            </div>
                                            <div className='additional-character-name-info'>
                                                {item?.voice_actors[0]?.language}
                                            </div>

                                        </div>
                                        :
                                        <div className='no-info'>
                                            Information not available
                                        </div>

                                    }

                                </div>
                            }) :
                            <div className='list-loading'>
                                <Hourglass
                                    visible={true}
                                    height="120"
                                    width="120"
                                    ariaLabel="hourglass-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    colors={['#306cce', '#72a1ed']}
                                />
                            </div>
                        }
                    </div>

                    <div className='character-title'>
                        <b>List of Episodes:</b> 
                    </div>

                    <div className='episode-list'>

                        {episodes?.length > 0 ?
                            episodes.map((item, index) => {
                                return <div key={index} className='episode-item'>
                                    <div className='episode-info'>
                                        <div className='episode-id'>
                                            {item?.mal_id}
                                        </div>
                                        <div className='episode-name'>
                                            {item?.title}
                                        </div>
                                    </div>
                                </div>
                            }) :
                            <div className='list-loading'>
                                <Hourglass
                                    visible={true}
                                    height="120"
                                    width="120"
                                    ariaLabel="hourglass-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    colors={['#306cce', '#72a1ed']}
                                />
                            </div>
                        }
                    </div>
                </div>
            </article>
        </div>
    )
}

export default AnimeInfo;