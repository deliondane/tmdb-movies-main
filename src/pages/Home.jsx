import React, { useEffect, useState } from 'react';
import MainUpComing from '../components/MainUpComing';
import axios from 'axios';
import AppMovieCard from '../components/AppMovieCard';
import UpComing from '../components/UpComing';



const Home = () => {
  const [appMovie, setAppMovie] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [visibleMovies, setVisibleMovies] = useState(15);
  const moviesPerPage = 15;

  const getMovies = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=546c72b99cf64514c2c03c7ef473011b&language=ko`);
      setAppMovie(response.data.results)
      console.log(response)
      setLoading(false)

    } catch (err) {
      console.error('Error:', err);
      setLoading(false)
    }
  }
  useEffect(() => {
    getMovies();
  }, [])

  // const handleLoadMore = () => {
  //   setVisibleMovies((prevVisible) => prevVisible + moviesPerPage)
  // }
  return (
    <div className='home'>
      <MainUpComing />
      <div className="mainContainer">
        <div className="tit_more">
          <h2 className='tit'>상영작</h2>
          < div className='more' >
            <button className='theMore'>더보기</button>
          </ div >
          {/* {
            appMovie.length > visibleMovies && (
              < div className='more' >
                <button className='theMore' onClick={handleLoadMore}>더보기</button>
              </ div >
            )

          } */}
        </div>
        <div className="mainMovie">
          {
            isLoading ? (<div className='loding'> 로딩중... </div>) : (
              <div>
                <div className='movie'>
                  {
                    appMovie.slice(0, visibleMovies).map(aM => (
                      <AppMovieCard
                        key={aM.id}
                        id={aM.id}
                        title={aM.title}
                        release_date={aM.release_date}
                        average={aM.vote_average}
                        posterPath={aM.poster_path}
                      />
                    ))
                  }

                </div>
              </div>
            )
          }
        </div>
      </div>
      <UpComing />
    </div>
  );
};

export default Home;