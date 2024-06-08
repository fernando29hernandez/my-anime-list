import React, { useState } from 'react';

import './styles.scss'

const Anime = ({ anime,setSelectedAnime,
    setIsAnimeSelected }) => {

    const [flipCard, setFlipCard] = useState(false);

    const handleFlip = () => {
        setFlipCard(!flipCard)
    }

    const ShowAnimeInfo = ()=>{
        setSelectedAnime(anime)
        setIsAnimeSelected(true)
    }

    return (
        <div className='flip-anime-card' >
            <div className={`anime-card-inner ${flipCard ? 'anime-card-inner-flip' : ''}`}>
                <article className="anime-card">
                    <div
                        href={''}
                        target="_blank"
                        rel="noreferrer">
                        <figure>
                            <img
                                src={anime.images.jpg.image_url}
                                alt="Anime Image" />
                        </figure>

                    </div>
                    <h3>{anime.title}</h3>
                    <div className='synopsis'>
                        {anime.synopsis}...
                    </div>
                    {/**
                     *  <div className='rank'>
                        Rank: {anime.rank}
                    </div>
                     */}
                   
                    <div className='button-container'>
                        <button className='info-button' onClick={handleFlip}>
                            Quick View
                        </button>
                        <button className='more-info-button' onClick={()=>ShowAnimeInfo()}>
                            Complete info.
                        </button>
                    </div>
                    
                </article>
                <article className="anime-card-back">

                    <h3>{anime.title}</h3>
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
                    <b>  Score:</b>  {anime?.score}
                    </div>
                    <div className='property'>
                    <b>  Trailer:</b> <a href={anime?.trailer?.url}>{anime?.trailer?.url}</a> 
                    </div>
                    <div className='button-container'>
                        <button className='info-button' onClick={handleFlip}>
                            Back
                        </button>
                       
                    </div>
                    
                </article>
               
            </div>
        </div>
    )
}

export default Anime;