import React, { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';

const VideoBackground = ({ movieId }) => {

    const getMovieVideos = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/786892/videos?language=en-US`, API_OPTIONS);
        const json = await data.json();
    
        const filteredData = json.results.filter(video => video.type === "Trailer");
        const trailer = filteredData.length ? filteredData[0] : json.results[0];

        console.log(trailer);
    }

    useEffect(() => {
        getMovieVideos();
    }, []);

    return (
        <div>

        </div>
    );
}

export default VideoBackground;
