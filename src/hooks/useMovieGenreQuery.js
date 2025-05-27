import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchGenreMovies = async (genreId) => {
  console.log(`/discover/movie?with_genres=${genreId}`);
  const res = await api.get('/discover/movie', {
    params: {
      with_genres: genreId,
      sort_by: 'popularity.desc',
      language: 'ko-KR',
    },
  });
  return res.data;
};

export const useMovieGenreQuery = (genreId) => {
  return useQuery({
    queryKey: ['genre-movies', genreId],
    queryFn: () => fetchGenreMovies(genreId),
    enabled: !!genreId,
  });
};
