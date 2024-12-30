import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoPlayOutline } from "react-icons/io5";

const MainUpComing = () => {
	const [upComingMovies, setUpComingMoves] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [trailer, setTrailer] = useState(null);

	const getMovies = async () => {
		try {
			const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=546c72b99cf64514c2c03c7ef473011b&language=ko`);
			setUpComingMoves(response.data.results)
			console.log(response)
			setLoading(false)

		} catch (err) {
			console.error('Error:', err);
			setLoading(false)
		}
	}

	// 예고편 정보 가져오기
	const getTrailer = async (movieId) => {
		try {
			const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=546c72b99cf64514c2c03c7ef473011b&language=ko`);
			// YouTube에서 예고편을 찾습니다
			const video = response.data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
			setTrailer(video);
		} catch (err) {
			console.error('예고편 가져오기 오류:', err);
		}
	};

	const getRandomMovie = () => {
		const randomIndex = Math.floor(Math.random() * upComingMovies.length);
		return upComingMovies[randomIndex]
	}
	const randomMovie = getRandomMovie();

	// 랜덤 영화의 예고편 정보 가져오기
	useEffect(() => {
		if (randomMovie?.id) {
			getTrailer(randomMovie.id);
		}
	}, [randomMovie]);
	useEffect(() => {
		getMovies();
	}, [])


	const getStarRating = (vote) => {
		const fullStars = Math.floor(vote / 2); // 10점 만점에서 5점 만점으로 변환
		const emptyStars = 5 - fullStars;
		return { fullStars, emptyStars };
	};

	const { fullStars, emptyStars } = getStarRating(randomMovie?.vote_average || 0);

	return (
		<div className='upComing'>
			{
				isLoading ? (<div className='loding'>로딩중..</div>) : (
					<div className="upMovie">
						<div className="upComingImg">
							<img src={`https://image.tmdb.org/t/p/w1280/${randomMovie.backdrop_path}`} alt={randomMovie.title} />
						</div>
						<div className="upComingInfo">
						</div>
						<div className="upInfoText">
							<div className="top">
								<p className="original_title">{randomMovie.original_title}</p>
								<p className="title">{randomMovie.title}</p>
							</div>
							<div className="bottom">
								<div className="star-rating">
									{Array.from({ length: fullStars }).map((_, index) => (
										<span key={`full-${index}`} className="star filled">★</span>
									))}
									{Array.from({ length: emptyStars }).map((_, index) => (
										<span key={`empty-${index}`} className="star empty">☆</span>
									))}
								</div>
								<p className="vote">{randomMovie.vote_average}</p>
								<p className="date">{randomMovie.release_date}</p>
							</div>
							<p className="overview">{randomMovie.overview}</p>
							<div className="trailer button">
								<IoPlayOutline />
								{trailer ? (
									<Link to={`https://www.youtube.com/watch?v=${trailer.key}`}
										target="_blank"
										rel="noopener noreferrer"
										className='button'>
										예고편 보러가기
									</Link>
								) : (
									<p className="no-hover" style={{ pointerEvents: "none", color: "#999" }}> No Trailer</p>
								)}
							</div>
						</div>
					</div>

				)
			}

		</div >
	);
};

export default MainUpComing;