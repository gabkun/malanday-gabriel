import axios from 'axios';

const API_KEY = '4013610';
const BASE_URL = 'http://www.omdbapi.com/';

export const fetchMovies = async (query) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        s: query,
        apikey: API_KEY,
      },
    });
    return response.data.Search || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};