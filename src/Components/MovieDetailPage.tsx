import React, { useEffect, useState } from 'react';
import { useParams, Link} from 'react-router-dom';
import { fetchMovieDetails, fetchTvDetails } from '../Services/Api';
import '../Styles/MovieDetailPage.css';

interface MovieDetailPageProps {
  mediaType: string;
}

interface MovieDetails {
  id: number;
  title: string;
  release_date: string;
  first_air_date: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  media_type: string;
  genre_ids: number[];
  tagline: string;
  overview: string;
  status: string;
  originalLanguage: string;
  budget: number;
  revenue: number;
  number_of_episodes: number;
  number_of_seasons: number;
}

const MovieDetailPage: React.FC<MovieDetailPageProps> = ({ mediaType }) => {
  const { id } = useParams<{ id: string }>();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        let details: MovieDetails | null = null;
        if (mediaType === 'movie') {
          details = await fetchMovieDetails(id || '');
        } else if (mediaType === 'tv') {
          details = await fetchTvDetails(id || '');
        }
        setMovieDetails(details);
      } catch (error) {
        console.log('Error fetching movie details:', error);
      }
    };

    fetchDetails();
  }, [id, mediaType]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const {
    title,
    release_date,
    first_air_date,
    vote_average,
    poster_path,
    backdrop_path,
    tagline,
    overview,
    status,
    originalLanguage,
    budget,
    revenue,
    number_of_episodes,
    number_of_seasons,
  } = movieDetails;

  const backgroundImage = `url(https://image.tmdb.org/t/p/original${backdrop_path})`;

  return (
    <div className="movie-detail-page">
      <div className="banner" style={{ backgroundImage }}>
        <div className="movie-poster">
          <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="Movie Poster" />
        </div>
        <div className="movie-details">
          <h1>{`${title} (${release_date || first_air_date})`}</h1>
          <div className="symbol-box">
            {mediaType === 'movie' && <span>{'A'}</span>}
            {mediaType === 'tv' && <span>{'UA'}</span>}
          </div>
          <p>{`${vote_average}/10`}</p>
          {/* Add icons and functionality for add to list, mark as favorite, add to watchlist, rate it, and play trailer */}
          <p>{tagline}</p>
          <p>{overview}</p>
          <p>{`Status: ${status}`}</p>
          <p>{`Original Language: ${originalLanguage}`}</p>
          <p>{`Budget: $${budget}`}</p>
          <p>{`Revenue: $${revenue}`}</p>
          {mediaType === 'tv' && <p>{`Number of Episodes: ${number_of_episodes}`}</p>}
          {mediaType === 'tv' && <p>{`Number of Seasons: ${number_of_seasons}`}</p>}
        </div>
      </div>
      <div className="top-billed-cast">
        <h2>Top Billed Cast</h2>
        {/* Render photo cards of artists with their names below */}
      </div>
      <div className="section">
        <h2>Section Heading</h2>
        {/* Render section content */}
      </div>
      <footer className="footer">
      <Link to="/">Go back to Home Page</Link>
      </footer>
    </div>
  );
};

export default MovieDetailPage;

