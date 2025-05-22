import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchTopRatedMovies = async () => {
  const res = await api.get('/movie/top_rated');
  return res.data;
};

export const useTopRatedMovies = () => {
  return useQuery({
    queryKey: ['topRatedMovies'],
    queryFn: fetchTopRatedMovies,
  });
};