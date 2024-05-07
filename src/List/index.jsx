import React, { useState } from 'react';
import Anime from '../Anime';

import './styles.scss'
import Pagination from '../Components/Pagination';

const List = ({ animes, totalPages, page, setPage, getData }) => {

    return (
        <div className="anime-list-container" >
            <div className="anime-list" style={{ "color": "#fffff" }}>
                {animes.map((item) => {
                    return (
                        <Anime key={item.mal_id} anime={item} />
                    )
                })}
            </div>
            <div className="list-paginator" style={{ "color": "#fffff" }}>
                <Pagination
                    setPage={setPage}
                    getData={getData}
                    totalPages={totalPages}
                    page={page}
                />

            </div>

        </div>

    )


}

export default List;