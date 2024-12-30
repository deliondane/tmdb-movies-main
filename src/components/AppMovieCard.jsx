import React from 'react';
import { Link } from 'react-router-dom';

const AppMovieCard = ({ id, title, release_date, average, posterPath }) => {
  const getStarRating = (vote) => {
    const fullStars = Math.floor(vote / 2); // 10점 만점에서 5점 만점으로 변환
    const emptyStars = 5 - fullStars;
    return { fullStars, emptyStars };
  };

  const { fullStars, emptyStars } = getStarRating(average || 0);

  return (

    <div className="aMovie overflow-y-auto" key={id}>
      <div className="aMovie-card">
        <Link to={`Movies/${id}`}>
          <div className="aMovieimgBox">
            <img src={`https://image.tmdb.org/t/p/w300/${posterPath}`} alt={title} />
          </div>
          <div className="aMovieInfo">
            <div className="aMovieflex">
              <h2 className="aMovieTitle">{title}</h2>
              <div className="star-rating">
                {Array.from({ length: fullStars }).map((_, index) => (
                  <span key={`full-${index}`} className="star filled">★</span>
                ))}
                {Array.from({ length: emptyStars }).map((_, index) => (
                  <span key={`empty-${index}`} className="star empty">☆</span>
                ))}
              </div>
            </div>
            <p className='date'>{release_date}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AppMovieCard;