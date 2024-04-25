import { FC } from 'react';
import './MoviesList.css';
import MovieCard from '../MovieCard/MovieCard';
import { Movie } from '../../types/types';

interface MoviesListProps {
  movies: Movie[];
}

const MoviesList: FC<MoviesListProps> = ({ movies }) => {
  return (
    <div className="movies-list">
      <ul className="movies-list__items">
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard
              id={movie.id}
              poster={movie.poster_path}
              rating={movie.vote_average}
              title={movie.title}
              releaseDate={movie.release_date}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesList;
