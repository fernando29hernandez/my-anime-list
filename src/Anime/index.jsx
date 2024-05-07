import React, { useState } from 'react';

import './styles.scss'

const Anime = ({ anime }) => {

    const [flipCard, setFlipCard] = useState(false);

    const handleFlip = () => {
        setFlipCard(!flipCard)
    }

    return (
        <div className='flip-anime-card' onClick={handleFlip}>
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
                    <div className='rank'>
                        Rank: {anime.rank}
                    </div>
                </article>
                <article className="anime-card-back">

                    <h3>{anime.title}</h3>
                    <div className='synopsis'>
                        {anime.synopsis}
                    </div>
                </article>
            </div>
        </div>
    )
}

export default Anime;