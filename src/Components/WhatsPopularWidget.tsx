import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { posterCards, fetchPopular } from '../Services/Api';
import '../Styles/WhatsPopularWidget.css';

const WhatsPopularWidget: React.FunctionComponent = () => {
  const [toggle, setToggle] = useState('streaming'); // State for toggle button
  const [movies, setMovies] = useState<posterCards[]>([]); // State for fetched movies

  useEffect(() => {
    fetchWhatsPopular();
  }, [toggle]);


  // Fetch whats popular based on the toggle state
  const fetchWhatsPopular = async () => {
    let criteria = '';

    // Determine the API endpoint based on the selected toggle
    if (toggle === 'streaming') {
      criteria =
        'discover/movie?include_video=true&release_date.lte=2023&sort_by=popularity.desc&language=en-US&with_watch_monetization_types=flatrate';
    } else if (toggle === 'onTv') {
      criteria = 'tv/on_the_air?api_key=7f2bf16398d509aab86dbd7043d159c1';
    } else if (toggle === 'forRent') {
      criteria =
        'discover/movie?include_video=true&release_date.lte=2023&sort_by=popularity.desc&language=en-US&watch_region=US&api_key=7f2bf16398d509aab86dbd7043d159c1&with_watch_monetization_types=rent';
    } else if (toggle === 'inTheatres') {
      criteria = 'movie/now_playing?api_key=7f2bf16398d509aab86dbd7043d159c1';
    }

    // Fetch movies from the API based on the criteria
    const fetchedMovies = await fetchPopular(criteria, toggle);
    setMovies(fetchedMovies);
  };

  // Calculates the vote percentage based on the vote average
  const calculateVotePercentage = (voteAverage: number) => {
    const votePercentage = Math.round((voteAverage / 10) * 100);
    return `${votePercentage}%`;
  };

// Formats the release date string
    const formatReleaseDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
      };
    

  const handleToggle = (selectedToggle: string) => {
    setToggle(selectedToggle);
  };

  return (
    <div className="whatsPopular">
      <div className="sectionHeading">
        <h2>Whats Popular</h2>
        <div className="popularToggleButtons">
          <button
            className={`popularToggleButton ${toggle === 'streaming' ? 'active' : ''}`}
            onClick={() => handleToggle('streaming')}
          >
            Streaming
          </button>
          <button
            className={`popularToggleButton ${toggle === 'onTv' ? 'active' : ''}`}
            onClick={() => handleToggle('onTv')}
          >
            On TV
          </button>
          <button
            className={`popularToggleButton ${toggle === 'forRent' ? 'active' : ''}`}
            onClick={() => handleToggle('forRent')}
          >
            For Rent
          </button>
          <button
            className={`popularToggleButton ${toggle === 'inTheatres' ? 'active' : ''}`}
            onClick={() => handleToggle('inTheatres')}
          >
            In Theatres
          </button>
        </div>
      </div>
      <div className="itemCards">
        {movies.map((movie) => (
        
          <div className= "itemCard" key={movie.id}>
          <Link to={`/${movie.media_type === 'tv' ? 'tv' : 'movie'}/${movie.id}`} >
            <img
               className="itemPoster"
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              
            />
            </Link>
            <div className="movieInfo">
              <p>User Score: {calculateVotePercentage(movie.vote_average)}</p>
              <h3>{movie.title}</h3>
              <p>{formatReleaseDate(movie.release_date)}</p>
            </div>
          
          </div>
        ))}
      </div>
    </div>
  );
};
export default WhatsPopularWidget;
