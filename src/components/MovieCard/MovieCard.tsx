import { Link } from 'react-router-dom';
import { FC } from 'react';
import './MovieCard.css';
import { getMovieRating, getReleaseDate } from '../../utils/helpers';
import Title from '../Title/Title';
import { POSTER_API_PATH } from '../../constants/constants';
import { MovieCardProps } from '../../types/types';

const MovieCard: FC<MovieCardProps> = ({
  poster,
  rating,
  title,
  releaseDate,
  id,
  isSmall = false,
}) => {
  return (
    <article className={`movie-card${isSmall ? ' movie-card_type_small' : ''}`}>
      <Link to={`/movie/${id}`} className="movies-list__link" target="_blank">
        <img
          className={`movie-card__poster${isSmall ? ' movie-card__poster_type_small' : ''}`}
          src={POSTER_API_PATH + poster}
          alt={title}
        />
      </Link>
      <div className="movie-card__info">
        {!isSmall && (
          <Title text={String(getMovieRating(rating || 0))} titleLvl="2" />
        )}
        <div className="movie-card__description">
          <span className="movie-card__title">{title}</span>
          {!isSmall && (
            <span className="movie-card__release-date">
              {getReleaseDate(releaseDate || '')}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
