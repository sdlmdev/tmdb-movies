import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Movie.css';
import Title from '../../components/Title/Title';
import { getFilmById, getSimilarMovies } from '../../utils/services/Api';
import { MovieType } from '../../types/types';
import Preloader from '../../components/Preloader/Preloader';
import { getMovieRating, getReleaseDate } from '../../utils/helpers';
import Error from '../../components/Error/Error';
import { POSTER_API_PATH } from '../../constants/constants';
import ScrollList from '../../components/ScrollMoviesList/ScrollMoviesList';

interface MovieProps {
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
  isError: boolean;
  setIsError: (isError: boolean) => void;
}

const Movie: FC<MovieProps> = ({
  setIsLoading,
  isLoading,
  isError,
  setIsError,
}) => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [similarMovies, setSimilarMovies] = useState<MovieType[]>([]);
  const [totalSimilarPages, setTotalSimilarPages] = useState(1);

  const getMovie = async () => {
    setIsLoading(true);
    try {
      const response = await getFilmById(id as string);

      setMovie(response);
      setTotalSimilarPages(response.total_pages);
      setIsError(false);
    } catch (err) {
      setIsError(true);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getSimilarFilms = async (page: number = 1) => {
    try {
      const response = await getSimilarMovies(id as string, page);

      setSimilarMovies(response.results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovie();
    getSimilarFilms(1);
  }, []);

  return (
    <section className="movie">
      {isLoading && <Preloader />}
      {isError && <Error />}
      {!isLoading && !isError && (
        <>
          <div className="movie__title">
            <Title
              text={
                `${getMovieRating(Number(movie?.vote_average))} ${movie?.title}` ||
                ''
              }
              titleLvl="1"
            />
          </div>
          <div className="movie__info">
            <div className="movie__description">
              <p className="movie__description-text">{movie?.overview}</p>
              <p>
                <strong>Продолжительность: </strong>
                {movie?.runtime} мин
              </p>
              <p>
                <strong>Популярность: </strong>
                {movie?.popularity}
              </p>
              <p>
                <strong>Дата выхода: </strong>
                {getReleaseDate(String(movie?.release_date))}
              </p>
              <p>
                <strong>Жанр: </strong>
                {movie?.genres.map((el) => el.name).join(', ')}
              </p>
            </div>
            <img
              className="movie__poster"
              src={POSTER_API_PATH + movie?.poster_path}
              alt={movie?.title}
            />
          </div>
          <div>
            <Title text="Похожие фильмы" titleLvl="3" />
            <ScrollList
              moviesData={similarMovies}
              getSimilarFilms={getSimilarFilms}
              totalSimilarPages={totalSimilarPages}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default Movie;
