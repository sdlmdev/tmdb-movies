import { FC, useState, useEffect } from 'react';
import './BestMovies.css';
import { getTopRatedFilmsList } from '../../utils/services/Api';
import MoviesList from '../../components/MoviesList/MoviesList';
import Title from '../../components/Title/Title';
import Preloader from '../../components/Preloader/Preloader';
import PaginationList from '../../components/PaginationList/PaginationList';
import Error from '../../components/Error/Error';

interface BestMoviesProps {
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
  setIsError: (isError: boolean) => void;
  isError: boolean;
}

const BestMovies: FC<BestMoviesProps> = ({
  setIsLoading,
  isLoading,
  setIsError,
  isError,
}) => {
  const [popularFilms, setPopularFilms] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const getPopularFilms = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await getTopRatedFilmsList(page);

      setPopularFilms(response.results);
      setTotalPages(response.total_pages);
      setIsError(false);
    } catch (err) {
      console.log(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    getPopularFilms(page);
  };

  useEffect(() => {
    getPopularFilms(currentPage);
  }, []);

  return (
    <section className="best-movies">
      {isLoading && <Preloader />}
      {isError && <Error />}
      {!isLoading && !isError && (
        <>
          <div className="best-movies__title">
            <Title text="Лучшие фильмы" titleLvl="1" />
          </div>
          <div className="best-movies__pagination-list">
            <PaginationList
              pageCount={totalPages}
              onPageClick={handlePageClick}
              currentPage={currentPage}
            />
          </div>
          <MoviesList movies={popularFilms} />
        </>
      )}
    </section>
  );
};

export default BestMovies;
