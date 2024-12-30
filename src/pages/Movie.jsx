import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import User from '../components/User';
import SearchDetail from './SearchDetail';

const Movie = () => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [m, setM] = useState(null);

  const getStarRating = (vote) => {
    const fullStars = Math.floor(vote / 2); // 10점 만점에서 5점 만점으로 변환
    const emptyStars = 5 - fullStars;
    return { fullStars, emptyStars };
  };

  const { fullStars, emptyStars } = getStarRating(m?.vote_average || 0);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=546c72b99cf64514c2c03c7ef473011b&language=ko`)
      .then(res => {
        console.log(res)
        setM(res.data);
        setLoading(false);
      })
  }, [id]);

  return (
    <div>
      {
        isLoading ? (<div className="loding" >로딩중...</div>) : (
          <>
            <div className='movi_movie'>
              <div className="movieBox">
                <img src={`https://image.tmdb.org/t/p/w1280/${m.backdrop_path}`} alt="" />
              </div>
              <div className="textBox">
                <div className="textBoxTitle">{m.title}</div>
                <div className="textBoxOriginalTitle">{m.original_title}</div>
                <div className="textBoxOverview">{m.overview}</div>
                <div className="textBoxGenres">
                  {m.genres.map(genre => (<span key={genre.id}>{genre.name}</span>))}
                </div>
                <div className="textBoxDate">{m.release_date}</div>
                <div className="textBoxAverage">
                  {Array.from({ length: fullStars }).map((_, index) => (
                    <span key={`full-${index}`} className="star filled">★</span>
                  ))}
                  {Array.from({ length: emptyStars }).map((_, index) => (
                    <span key={`empty-${index}`} className="star empty">☆</span>
                  ))}
                  <p>{m.vote_average}</p>
                </div>
              </div>
            </div>
            <SearchDetail movieId={id} />
          </>
        )
      }
    </div>
  );
};

export default Movie;