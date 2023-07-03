import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { posterCards, fetchFree } from '../Services/Api';
import '../Styles/FreeToWatchWidget.css';

const FreeToWatchWidget: React.FunctionComponent = () => {
  const [selectedToggle, setSelectedToggle] = useState('Movies');
  const [movies, setMovies] = useState<posterCards[]>([]);

  useEffect(() => {
    fetchFreeToWatch();
  }, [selectedToggle]);

  const fetchFreeToWatch = async () => {
    let criteria = '';

    if (selectedToggle === 'Movies') {
      criteria =
        'discover/movie?include_video=true&language=en-US&api_key=7f2bf16398d509aab86dbd7043d159c1&with_watch_monetization_types=free';
    } else if (selectedToggle === 'Tv') {
      criteria =
        'discover/tv?language=en-US&api_key=7f2bf16398d509aab86dbd7043d159c1&with_watch_monetization_types=free';
    }

    const fetchedMovies = await fetchFree(criteria, selectedToggle);
    setMovies(fetchedMovies);
  };

  const calculateVotePercentage = (voteAverage: number) => {
    const votePercentage = Math.round((voteAverage / 10) * 100);
    return `${votePercentage}%`;
  };

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
    setSelectedToggle(selectedToggle);
  };

  return (
    <div className="free-to-watch-widget">
      <div className="freeHeader">
        <h2>Free to Watch</h2>
        <div className="freeHeader-buttons">
          <button
            className={`freeHeader-button ${
              selectedToggle === 'Movies' ? 'active' : ''
            }`}
            onClick={() => handleToggle('Movies')}
          >
            Movies
          </button>
          <button
            className={`freeHeader-button ${
              selectedToggle === 'Tv' ? 'active' : ''
            }`}
            onClick={() => handleToggle('Tv')}
          >
            Tv
          </button>
        </div>
      </div>
      <div className="freeBody">
        {movies.map((movie) => (
          <div className="freeCard" key={movie.id}>
            <Link to={`/${movie.media_type === 'tv' ? 'tv' : 'movie'}/${movie.id}`} >
              <div className="freeCard-image">
                <img
                  className="freeCard-image"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
            </Link>
            <div className="freeCard-info">
              <p className="freeVote">
                User Score: {calculateVotePercentage(movie.vote_average)}
              </p>
              <h3 className="freeTitle">{movie.title}</h3>
              <p className="freeReleaseDate">
                {formatReleaseDate(movie.release_date)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreeToWatchWidget;
