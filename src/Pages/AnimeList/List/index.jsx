import React, { useState } from 'react';
import Anime from './../Anime';

import './styles.scss'
import Pagination from '../../../Components/Pagination';
import SadIcon from './SadIcon';

const List = ({ animes, totalItems, page, setPage, getData,setSelectedAnime,
    setIsAnimeSelected }) => {
    return (
        <div className="anime-list-container" >
            <div className="anime-list" style={{ "color": "#fffff" }}>
                    {animes != undefined && animes.length > 0 ? animes.map((item, index) => {
                        return (
                            <Anime key={item.mal_id + "anime" + index} anime={item} setSelectedAnime={setSelectedAnime} 
                            setIsAnimeSelected={setIsAnimeSelected}/>
                        )
                    }) 
                : 
                    <div className="error-msg">
                        <div style={{ marginBottom: "10px" }} >
                            Too many requests per minute, try later
                        </div>
                        <div >
                            <SadIcon />
                        </div>
                    </div>
                }
            </div>
            <div className="list-paginator" style={{ "color": "#fffff" }}>
                <Pagination
                    setPage={setPage}
                    getData={getData}
                    totalItems={totalItems}
                    page={page}
                />
            </div>
        </div>

    )


}

export default List;