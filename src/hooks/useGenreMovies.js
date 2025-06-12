import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export const useGenreMoviesQuery = (genreId) => {
  return useQuery({
    queryKey: ['genre-movies', genreId],
    queryFn: async () => {
      const res = await api.get(`/discover/movie`, {
        params: {
          with_genres: genreId,
          sort_by: 'popularity.desc', 
        },
      });
      return res.data;
    },
  });
};
