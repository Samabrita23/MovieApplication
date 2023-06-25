import React from 'react';

const apiKey = '7f2bf16398d509aab86dbd7043d159c1';

export interface posterCards {
  id: number;
  name: string;
  title: string;
  release_date: string;
  first_air_date: string;
  vote_average: number;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
}

export const fetchTrending = async (toggle: string): Promise<posterCards[]> => {
  try {
    const response = await fetch(
      toggle === 'today'
        ? `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`
        : `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`
    );
    const data = await response.json();

    const modifiedData: posterCards[] = data.results.map((movie: posterCards) => {
      if (movie.media_type === 'tv') {
        return {
          ...movie,
          title: movie.name,
          release_date: movie.first_air_date,
        };
      }
      return movie;
    });

    return modifiedData;
  } catch (error) {
    console.log('Error fetching Trending show:', error);
    return [];
  }
};

export const fetchPopular = async (criteria: string, toggle: string): Promise<posterCards[]> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${criteria}&api_key=${apiKey}`
    );
    const data = await response.json();

    const modifiedData: posterCards[] = data.results.map((movie: posterCards) => {
      if (toggle === 'onTv') {
        return {
          ...movie,
          title: movie.name,
          release_date: movie.first_air_date,
        };
      }
      return movie;
    });

    return modifiedData;
  } catch (error) {
    console.log('Error fetching Popular show:', error);
    return [];
  }
};

export const fetchFree = async (criteria: string, selectedToggle: string): Promise<posterCards[]> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${criteria}?api_key=${apiKey}`
    );
    const data = await response.json();

    const modifiedData: posterCards[] = data.results.map((movie: posterCards) => {
      if (selectedToggle === 'Tv') {
        return {
          ...movie,
          title: movie.name,
          release_date: movie.first_air_date,
        };
      }
      return movie;
    });

    return modifiedData;
  } catch (error) {
    console.log('Error fetching Free to watch show:', error);
    return [];
  }
};

export const fetchMovieDetails = async (movieId: string | number): Promise<any> => {
  try {
    const id = String(movieId);
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=release_dates&language=en-US&api_key=${apiKey}`
    );
    const data = await response.json();

    const movieDetails = {
      id: data.id,
      title: data.title,
      release_date: data.release_dates.results[0].release_date,
      first_air_date: '',
      vote_average: data.vote_average,
      poster_path: data.poster_path,
      backdrop_path: data.backdrop_path,
      media_type: 'movie',
      genre_ids: data.genres.map((genre: any) => genre.id),
      tagline: data.tagline,
      overview: data.overview,
      status: data.status,
      originalLanguage: data.original_language,
      budget: data.budget,
      revenue: data.revenue,
    };

    return movieDetails;
  } catch (error) {
    console.log('Error fetching movie details:', error);
    throw error;
  }
};

export const fetchTvDetails = async (seriesId: string | number): Promise<any> => {
  try {
    const id = String(seriesId);
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=${apiKey}`
    );
    const data = await response.json();

    const tvSeriesDetails = {
      id: data.id,
      name: data.name,
      title: data.name,
      poster_path: data.poster_path,
      backdrop_path: data.backdrop_path,
      first_air_date: data.first_air_date,
      vote_average: data.vote_average,
      media_type: 'tv',
      tagline: data.tagline,
      overview: data.overview,
      status: data.status,
      originalLanguage: data.original_language,
      number_of_episodes: data.number_of_episodes,
      number_of_seasons: data.number_of_seasons,
      genre_ids: data.genres.map((genre: any) => genre.id),

    };

    return tvSeriesDetails;
  } catch (error) {
    console.log('Error fetching TV series details:', error);
    throw error;
  }
};
