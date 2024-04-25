import { API_URL } from '../../constants/constants';
import { MovieType } from '../../types/types';
const apiKey = import.meta.env.VITE_API_KEY;

export const checkResponse = async (res: Response) => {
  if (res.status >= 200 && res.status < 300) {
    return await res.json();
  }

  return Promise.reject(new Error(`Ошибка: ${res.status}`));
};

export const getTopRatedFilmsList = async (page = 1) => {
  const response = await fetch(
    `${API_URL}/movie/top_rated?page=${page}&language=ru-RU`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + apiKey,
      },
    }
  );

  const data = await checkResponse(response);
  const moviesWithImages = data.results.filter(
    (movie: MovieType) => movie.poster_path != null
  );

  return { ...data, results: moviesWithImages };
};

export const getFilmById = async (id: string) => {
  const response = await fetch(`${API_URL}/movie/${id}?language=ru-RU`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + apiKey,
    },
  });

  return checkResponse(response);
};

export const getSimilarMovies = async (id: string, page = 1) => {
  const response = await fetch(
    `${API_URL}/movie/${id}/similar?page=${page}&language=ru-RU`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + apiKey,
      },
    }
  );

  const data = await checkResponse(response);
  const moviesWithImages = data.results.filter(
    (movie: MovieType) => movie.poster_path != null
  );

  return { ...data, results: moviesWithImages };
};
