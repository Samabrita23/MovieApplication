import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetails, fetchTvDetails } from '../Services/Api';
import '../Styles/MovieDetailPage.css';

// Define the type of props expected by the MovieDetailPage component
interface MovieDetailPageProps {
  mediaType: string;
}

// Define the structure of the movie details object
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

// Define the MovieDetailPage component
const MovieDetailPage: React.FC<MovieDetailPageProps> = ({ mediaType }) => {
  // Get the 'id' parameter from the URL using the useParams hook
  const { id } = useParams<{ id: string }>();

  // Define state variables to store movie details and genres
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [genres, setGenres] = useState<string[]>([]);

  // Fetch movie details or TV show details when the component mounts or the 'id' or 'mediaType' changes
  useEffect(() => {
    // Define an async function to fetch details
    const fetchDetails = async () => {
      try {
        let details: MovieDetails | null = null;
        if (mediaType === 'movie') {
          // Fetch movie details using the fetchMovieDetails function
          details = await fetchMovieDetails(id || '');
        } else if (mediaType === 'tv') {
          // Fetch TV show details using the fetchTvDetails function
          details = await fetchTvDetails(id || '');
        }
        // Update the movie details state
        setMovieDetails(details);
      } catch (error) {
        console.log('Error fetching movie details:', error);
      }
    };

    // Call the fetchDetails function
    fetchDetails();
  }, [id, mediaType]);

  // Fetch genres based on genre_ids when the 'mediaType' or 'movieDetails' changes
  useEffect(() => {
    // Define an async function to fetch genres
    const fetchGenres = async () => {
      try {
        // Fetch genre list from API based on genre_ids
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=7f2bf16398d509aab86dbd7043d159c1&language=en-US`
        );
        const data = await response.json();
        // Map genre IDs to their corresponding names
        const genreMap: { [key: number]: string } = {};
        data.genres.forEach((genre: { id: number; name: string }) => {
          genreMap[genre.id] = genre.name;
        });
        // Get movie genres based on genre_ids and update the genres state
        const movieGenres = movieDetails?.genre_ids.map((id: number) => genreMap[id]);
        setGenres(movieGenres || []);
      } catch (error) {
        console.log('Error fetching genres:', error);
      }
    };

    // Call the fetchGenres function
    fetchGenres();
  }, [mediaType, movieDetails]);

  // Render a loading message if movieDetails is null
  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  // Destructure the movieDetails object to access its properties
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

  
// Set the background image for the banner section with a linear gradient overlay
const backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/original${backdrop_path})`;


  // Function to get the full language name based on language code
  const getFullLanguage = (languageCode: string) => {
    switch (languageCode) {
      case 'es':
        return 'Spanish';
      case 'fr':
        return 'French';
      case 'en':
        return 'English';
      case 'hi':
        return 'Hindi';
      default:
        return languageCode;
    }
  };

  // Function to get the year from the release date
  const getYearFromReleaseDate = (date: string) => {
    if (date) {
      const year = new Date(date).getFullYear();
      return year.toString();
    }
    return '';
  };

  // Render the movie details page
  return (
    <div className="movie-detail-page">
      <div className="banner" style={{ backgroundImage }}>
        <div className="moviePoster">
          <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="Movie Poster" />
        </div>
        <div className="movieDetails">
          <h1>
            {`${title} (${getYearFromReleaseDate(
              mediaType === 'movie' ? release_date : first_air_date
            )})`}
          </h1>
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

// Export the MovieDetailPage component as the default export
export default MovieDetailPage;
