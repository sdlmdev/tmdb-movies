import { useEffect, useState, FC } from 'react';
import './ScrollMoviesList.css';
import useHorizontalScroll from '../../hooks/useHorizontalScroll';
import { LENGTH_TO_START_SCROLLING } from '../../constants/constants';
import MovieCard from '../MovieCard/MovieCard';
import { MovieType } from '../../types/types';
import Error from '../Error/Error';

interface ScrollMoviesListProps {
  moviesData: MovieType[];
  getSimilarFilms: (page: number) => void;
  totalSimilarPages: number;
}

const ScrollMoviesList: FC<ScrollMoviesListProps> = ({
  moviesData,
  getSimilarFilms,
  totalSimilarPages,
}) => {
  const [isScrollStatus, setIsScrollStatus] = useState(false);
  const scrollOnClick = useHorizontalScroll();
  const [currentPage, setCurrentPage] = useState(1);

  const getScrollAttributes = () => {
    if (isScrollStatus) {
      return { ...scrollOnClick };
    }
    return {};
  };

  const handleGetSimilarFilms = (isPrev: boolean = false) => {
    if (isPrev) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(currentPage + 1);
    }

    if (scrollOnClick.ref.current) {
      scrollOnClick.ref.current.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const getScrollStatus = () => {
      if (moviesData.length > LENGTH_TO_START_SCROLLING) {
        setIsScrollStatus(true);
      } else {
        setIsScrollStatus(false);
      }
    };

    getScrollStatus();
  }, [isScrollStatus, moviesData.length]);

  useEffect(() => {
    getSimilarFilms(currentPage);
  }, [currentPage]);

  return (
    <ul className="scroll-list scrollbar" {...getScrollAttributes()}>
      <li className="scroll-list__prev-container">
        <button
          className={`scroll-list__prev${currentPage === 1 ? ' disabled-switch' : ''}`}
          onClick={() => handleGetSimilarFilms(true)}
          disabled={currentPage === 1}
        />
      </li>
      {moviesData.length > 0 ? (
        moviesData.map((movie) => (
          <li key={movie.id}>
            <MovieCard
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title}
              isSmall
            />
          </li>
        ))
      ) : (
        <li>
          <Error titleLvl="4" />
        </li>
      )}
      <li className="scroll-list__next-container">
        <button
          className={`scroll-list__next${currentPage === totalSimilarPages ? ' disabled-switch' : ''}`}
          onClick={() => handleGetSimilarFilms()}
          disabled={currentPage === totalSimilarPages}
        />
      </li>
    </ul>
  );
};

export default ScrollMoviesList;
