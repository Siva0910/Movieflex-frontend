import axiosInstance from './axiosInstance';

export const fetchMovies = async (query, pageNumber = 0, pageSize = 6, sortBy = 'title', dir = 'asc') => {
  try {
    const response = await axiosInstance.get('/api/v1/movie/allMoviesPageSort', {
      params: {
        pageNumber,
        pageSize,
        sortBy,
        dir,
        query,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error; 
  }
};
