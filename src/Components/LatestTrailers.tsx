import React, { useState, useEffect } from 'react';
import { Movie, fetchMovies, fetchVideoDetails } from '../Services/LatestApi';
import '../Styles/LatestTrailer.css';

interface Trailer {
  id: string;
  key: string;
  name: string;
}

const LatestTrailers: React.FC = () => {
  const [toggle, setToggle] = useState('streaming'); // State for toggle button
  const [movies, setMovies] = useState<Movie[]>([]); // State for fetched movies
  const [selectedTrailer, setSelectedTrailer] = useState<Trailer | null>(null); // State for selected trailer
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal window

  useEffect(() => {
    fetchLatestTrailers();
  }, [toggle]);

  // Fetch latest trailers based on the toggle state
  const fetchLatestTrailers = async () => {
    let criteria = '';

    // Determine the API endpoint based on the selected toggle
    if (toggle === 'streaming') {
      criteria = 'discover/movie?include_video=true&release_date.lte=2023&sort_by=primary_release_date.desc&language=en-US&watch_region=US&api_key=7f2bf16398d509aab86dbd7043d159c1&with_watch_monetization_types=flatrate';
    } else if (toggle === 'onTv') {
      criteria = 'tv/on_the_air?api_key=7f2bf16398d509aab86dbd7043d159c1';
    } else if (toggle === 'forRent') {
      criteria = 'discover/movie?include_video=true&release_date.lte=2023&sort_by=primary_release_date.desc&language=en-US&watch_region=US&api_key=7f2bf16398d509aab86dbd7043d159c1&with_watch_monetization_types=rent';
    } else if (toggle === 'inTheatres') {
      criteria = 'movie/now_playing?api_key=7f2bf16398d509aab86dbd7043d159c1';
    }

    // Fetch movies from the API based on the criteria
    const fetchedMovies = await fetchMovies(criteria);
    setMovies(fetchedMovies);
  };

  // Handle toggle button click
  const handleToggle = (selectedToggle: string) => {
    setToggle(selectedToggle);
  };

  // Handle click on a movie trailer
  const handleTrailerClick = async (id: number, mediaType: string) => {
    let videoKey: string | null = null;

    // Fetch video details based on the media type (movie or tv)
    if (mediaType === 'movie') {
      const videos = await fetchVideoDetails(id, 'movie');
      const trailerVideo = videos.find((video) => video.type === 'Trailer' && video.site === 'YouTube');
      if (trailerVideo) {
        videoKey = trailerVideo.key;
      }
    } else if (mediaType === 'tv') {
      const videos = await fetchVideoDetails(id, 'tv');
      const trailerVideo = videos.find((video) => video.type === 'Trailer' && video.site === 'YouTube');
      if (trailerVideo) {
        videoKey = trailerVideo.key;
      }
    }

    // If a valid video key is found, set the selected trailer and open the modal
    if (videoKey) {
      setSelectedTrailer({ id: id.toString(), key: videoKey, name: '' });
      setIsModalOpen(true);
    } else {
      setSelectedTrailer(null);
    }
  };

  // Handle modal window open/close
  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Render the list of trailers
  const renderTrailers = () => {
    if (movies.length === 0) {
      return <p>No movies found.</p>;
    }

    return (
      <div className="trailers-container">
        {movies.map((movie) => (
          <div key={movie.id} className="card">
            <div className="card-inner">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <button onClick={() => handleTrailerClick(movie.id, movie.media_type)} className="play-button">
                <span className="play-icon"></span>
              </button>
            </div>
            <p className="cardTitle">{movie.title}</p>
          </div>
        ))}
      </div>
    );
  };

  // Render the component
  return (
    <div className="latest-trailers">
      <div className="section-heading">
        <h2>Latest Trailers</h2>
        <div className="latestToggle-buttons">
          <button
            className={`latestToggle-button ${toggle === 'streaming' ? 'active' : ''}`}
            onClick={() => handleToggle('streaming')}
          >
            Streaming
          </button>
          <button
            className={`latestToggle-button ${toggle === 'onTv' ? 'active' : ''}`}
            onClick={() => handleToggle('onTv')}
          >
            On TV
          </button>
          <button
            className={`latestToggle-button ${toggle === 'forRent' ? 'active' : ''}`}
            onClick={() => handleToggle('forRent')}
          >
            For Rent
          </button>
          <button
            className={`latestToggle-button ${toggle === 'inTheatres' ? 'active' : ''}`}
            onClick={() => handleToggle('inTheatres')}
          >
            In Theatres
          </button>
        </div>
      </div>
      {renderTrailers()}
      {selectedTrailer && (
        <div className={`modal ${isModalOpen ? 'open' : ''}`} onClick={handleModalOpen}>
          <iframe
            title={selectedTrailer.name}
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${selectedTrailer.key}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default LatestTrailers;
