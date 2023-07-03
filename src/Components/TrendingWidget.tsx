import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/TrendingWidget.css';
import { posterCards, fetchTrending } from '../Services/Api';

// Component to display a trending movie widget
const TrendingWidget: React.FunctionComponent = () => {
  // State variables
  const [movies, setMovies] = useState<posterCards[]>([]); // Stores the list of trending movies
  const [selectedToggle, setSelectedToggle] = useState('today'); // Stores the selected toggle option

  // Fetch movies when the selected toggle option changes
  useEffect(() => {
    fetchData(selectedToggle);
  }, [selectedToggle]);

  // Fetches movies based on the selected toggle option
  const fetchData = async (toggle: string) => {
    const data = await fetchTrending(toggle); // Calls the fetchMovies function from the API service
    setMovies(data); // Updates the movies state with the fetched data
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

  // Handles the toggle button click and updates the selectedToggle state
  const handleToggleChange = (toggle: string) => {
    setSelectedToggle(toggle);
  };

  // Render the component
  return (
    <div className="trending-widget">
      <div className="trending-header">
        <h2>Trending</h2>
        <div className="toggle-buttons">
          {/* Toggle button for 'today' option */}
          <button
            className={selectedToggle === 'today' ? 'active' : ''}
            onClick={() => handleToggleChange('today')}
          >
            Today
          </button>
          {/* Toggle button for 'thisWeek' option */}
          <button
            className={selectedToggle === 'thisWeek' ? 'active' : ''}
            onClick={() => handleToggleChange('thisWeek')}
          >
            This Week
          </button>
        </div>
      </div>
      <div className="movie-list">
        {/* Iterate over the movies and render movie cards */}
        {movies.map((movie) => (
          <div className= "movie-card" key={movie.id}>
            {/* Link to the movie details page */}
            <Link to={`/${movie.media_type === 'tv' ? 'tv' : 'movie'}/${movie.id}`} >
              {/* Movie poster image */}
              <img
                className="trendingImage"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
             </Link>
            <div className="movie-details">
              {/* Movie vote percentage */}
              <p className="movie-vote">
                User Score: {calculateVotePercentage(movie.vote_average)}
              </p>
              {/* Movie title */}
              <h3 className="movie-title">{movie.title}</h3>
              {/* Movie release date */}
              <p className="movie-release-date">
                {formatReleaseDate(movie.release_date)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingWidget;
