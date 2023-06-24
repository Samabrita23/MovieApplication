
const apiKey= '7f2bf16398d509aab86dbd7043d159c1';

// Interface for the movie object
export interface posterCards {
  id: number;
  name:string;
  title: string;
  release_date: string;
  first_air_date:string;
  vote_average: number;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
}

// Fetches trending movies based on the toggle (either 'today' or 'week')
export const fetchTrending = async (toggle: string): Promise<posterCards[]> => {
  try {
    // Send a GET request to the appropriate API endpoint based on the toggle
    const response = await fetch(
      toggle === 'today'
        ? 'https://api.themoviedb.org/3/trending/all/day?api_key=7f2bf16398d509aab86dbd7043d159c1'
        : 'https://api.themoviedb.org/3/trending/all/week?api_key=7f2bf16398d509aab86dbd7043d159c1'
    );
    // Parse the response as JSON
    const data = await response.json();

    // Modify the fetched data based on the criteria
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

    // Return the modified array of fetched trending movies
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
    // Parse the response as JSON
    const data = await response.json();

    // Modify the fetched data based on the toggle
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

    // Return the modified array of fetched movies/tv shows
    return modifiedData;
  } catch (error) {
    console.log('Error fetching Popular show:', error);
    return [];
  }
};







export const fetchFree = async (criteria: string, selectedToggle: string): Promise<posterCards[]> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${criteria}&api_key=${apiKey}`
    );
    const data = await response.json();
     // Modify the fetched data based on the toggle
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
    console.log ('Error fetching Free to watch show:', error);
    return [];
  }
};









// Fetches movie details based on the provided movieId
export const fetchMovieDetails = async (movieId: string | number): Promise<any> => {
  try {
    // Convert the movieId to a string
    const id = String(movieId);
    // Send a GET request to the API endpoint with the provided movieId
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=7f2bf16398d509aab86dbd7043d159c1&language=en-US`);
    // Parse the response as JSON
    const data = await response.json();
    // Return the fetched movie details
    return data;
  } catch (error) {
    console.log('Error fetching movie details:', error);
    throw error;
  }
};