export const getMovieRating = (rating: number) =>
  (Math.floor(rating * 10) / 10).toFixed(1);

export const getReleaseDate = (releaseDate: string): string => {
  return new Date(releaseDate).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
