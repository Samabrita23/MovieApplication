const apiKey = '7f2bf16398d509aab86dbd7043d159c1';

// Interface for the Movie object
export interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
}

// Fetches movies based on the provided criteria
export const fetchMovies = async (criteria: string): Promise<Movie[]> => {
  try {
    // Send a GET request to the appropriate API endpoint based on the criteria
    const response = await fetch(
      `https://api.themoviedb.org/3/${criteria}&api_key=${apiKey}`
    );
    // Parse the response as JSON
    const data = await response.json();
    // Return the array of fetched movies
    return data.results;
  } catch (error) {
    console.log('Error fetching movies:', error);
    return [];
  }
};

// Fetches video details for a movie or TV series
export const fetchVideoDetails = async (id: number, mediaType: string): Promise<any[]> => {
  try {
    // Send a GET request to the API endpoint with the provided id and media type
    const response = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${apiKey}&language=en-US`
    );
    // Parse the response as JSON
    const data = await response.json();
    // Filter and return the array of fetched video details of type "Trailer" and site "YouTube"
    const trailers = data.results.filter(
      (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
    );
    return trailers;
  } catch (error) {
    console.log('Error fetching video details:', error);
    return [];
  }
};
