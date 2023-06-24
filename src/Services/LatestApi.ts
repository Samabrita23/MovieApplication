import { posterCards } from "./Api";
const apiKey = '7f2bf16398d509aab86dbd7043d159c1';


// Fetches movies based on the provided criteria
export const fetchMovies = async (criteria: string, toggle: string): Promise<posterCards[]> => {
  try {
    // Send a GET request to the appropriate API endpoint based on the criteria
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
