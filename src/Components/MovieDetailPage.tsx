import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../Services/Api';
import PageHeader from './PageHeader';
// import PageFooter from './PageFooter'; - Commented out, not being used
import '../Styles/MovieDetailPage.css';

interface MovieDetailParams {
  movieId: string;
  [key: string]: string | undefined;
}

const MovieDetailPage: React.FunctionComponent = () => {
  // Extract the "movieId" from the URL parameters using the "useParams" hook
  const { movieId } = useParams<MovieDetailParams>();

  // State to store the movie data
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    // Fetch the movie details when the component mounts
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    try {
      if (movieId) {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      }
    } catch (error) {
      console.log('Error fetching movie details:', error);
    }
  };

  // If movie data is not available, show a loading message
  if (!movie) {
    return <div>Loading...</div>;
  }

  // Render the movie details
  return (
    <div className="movie-detail-page">
      <PageHeader />
      <div className="movie-banner" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
        <div className="movie-details">
          <div className="movie-poster-card">
            <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          </div>
          <div className="movie-info">
            <h1 className="movie-title">{movie.title} ({movie.release_date.substring(0, 4)})</h1>
            <div className="movie-metadata">
              {movie.adult ? <div className="symbol-box">A</div> : <div className="symbol-box">UA</div>}
              <p className="release-date">{movie.release_date}</p>
              <p className="genres">{movie.genres.map((genre: any) => genre.name).join(', ')}</p>
              <p className="duration">{movie.runtime} min</p>
            </div>
            <div className="user-score">
              <p>User Score</p>
              <div className="icons">
                <span>Add to List</span>
                <span>Mark as Favorite</span>
                <span>Add to Watchlist</span>
                <span>Rate it</span>
                <span>Play Trailer</span>
              </div>
            </div>
            <p className="tagline">{movie.tagline}</p>
            <p className="overview">{movie.overview}</p>
            <div className="credits">
              <div className="characters">
                <p>Characters:</p>
                <ul>
                  {movie.credits.cast.slice(0, 5).map((cast: any) => (
                    <li key={cast.id}>{cast.name}</li>
                  ))}
                </ul>
              </div>
              <div className="directors">
                <p>Directors:</p>
                <ul>
                  {movie.credits.crew
                    .filter((crew: any) => crew.job === 'Director')
                    .map((director: any) => (
                      <li key={director.id}>{director.name}</li>
                    ))}
                </ul>
              </div>
              <div className="writers">
                <p>Writers:</p>
                <ul>
                  {movie.credits.crew
                    .filter((crew: any) => crew.job === 'Writer')
                    .map((writer: any) => (
                      <li key={writer.id}>{writer.name}</li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="movie-details-section">
        <div className="top-billed-cast-section">
          <h2>Top Billed Cast</h2>
          <div className="cast-photos">
            {movie.credits.cast.slice(0, 6).map((cast: any) => (
              <div className="cast-card" key={cast.id}>
                <img className="cast-photo" src={`https://image.tmdb.org/t/p/w300${cast.profile_path}`} alt={cast.name} />
                <p className="cast-name">{cast.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="additional-section">
          <div className="section">
            <h3>Status</h3>
            <p>{movie.status}</p>
          </div>
          <div className="section">
            <h3>Original Language</h3>
            <p>{movie.original_language}</p>
          </div>
          <div className="section">
            <h3>Budget</h3>
            <p>${movie.budget.toLocaleString()}</p>
          </div>
          <div className="section">
            <h3>Revenue</h3>
            <p>${movie.revenue.toLocaleString()}</p>
          </div>
        </div>
      </div>
      {/* <PageFooter /> */} - Commented out, not being used
    </div>
  );
};

export default MovieDetailPage;
