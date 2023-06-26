import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  const [genres, setGenres] = useState<string[]>([]);

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

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        // Fetch genre list from API based on genre_ids
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=7f2bf16398d509aab86dbd7043d159c1&language=en-US`
        );
        const data = await response.json();
        const genreMap: { [key: number]: string } = {};
        data.genres.forEach((genre: { id: number; name: string }) => {
          genreMap[genre.id] = genre.name;
        });
        const movieGenres = movieDetails?.genre_ids.map((id: number) => genreMap[id]);
        setGenres(movieGenres || []);
      } catch (error) {
        console.log('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, [mediaType, movieDetails]);

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

  const getFullLanguage = (languageCode: string) => {
    switch (languageCode) {
      case 'es':
        return 'Spanish';
      case 'fr':
        return 'French';
        case 'en':
      return 'English';
      default:
        return languageCode;

    }
  };

  const getYearFromReleaseDate = (date: string) => {
    if (date) {
      const year = new Date(date).getFullYear();
      return year.toString();
    }
    return '';
  };
  

  return (
    <div className="movie-detail-page">
      <div className="banner" style={{ backgroundImage }}>
      
        <div className="moviePoster">
          <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="Movie Poster" />
        </div>
        <div className="movieDetails">
          <h1>{`${title} (${getYearFromReleaseDate(
              mediaType === 'movie' ? release_date : first_air_date
             )})`}</h1>
          <div className="symbol-box">{mediaType === 'movie' ? 'A' : 'UA'}</div>
          <p>{`${vote_average}/10`}</p>
          <p>{genres.join(', ')}</p>
          <p>{tagline}</p>
          <p className="overview">{overview}</p>
          <p>{`Status: ${status}`}</p>
          <p>{`Language: ${getFullLanguage(originalLanguage)}`}</p>
          <p>{`Budget: $${budget}`}</p>
          <p>{`Revenue: $${revenue}`}</p>
          {mediaType === 'tv' && <p>{`Number of Episodes: ${number_of_episodes}`}</p>}
          {mediaType === 'tv' && <p>{`Number of Seasons: ${number_of_seasons}`}</p>}
        </div>
      </div>

      <footer className="footer">
        <Link to="/">Go back to Home Page</Link>
      </footer>
    </div>
  );
};

export default MovieDetailPage;
