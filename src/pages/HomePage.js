import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../services/movieService';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/login');
    } else {
      loadMovies();
    }
  }, [navigate]);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const data = await fetchMovies(query);
      if (data.statusCode === '200') {
        setMovies(data.data.movieDtos);
        console.log(data.data.movieDtos);
      }
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.length > 0) {
      const timeoutId = setTimeout(() => {
        fetchMoviesDebounced();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [query]);

  const fetchMoviesDebounced = async () => {
    setLoading(true);
    try {
      const data = await fetchMovies(query);
      if (data.statusCode === '200') {
        setMovies(data.data.movieDtos);
      }
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  console.log(movies);

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.movieId} className="col-md-4 mb-4">
                <div className="card">
                  <img
                    src={movie.posterUrl}
                    className="card-img-top"
                    alt={movie.title}
                    style={{ height: '400px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">
                      <strong>Director:</strong> {movie.director} <br />
                      <strong>Studio:</strong> {movie.studio} <br />
                      <strong>Release Year:</strong> {movie.releaseYear} <br />
                      <strong>Cast:</strong> {movie.movieCast.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
