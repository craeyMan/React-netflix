import React from 'react'
import { usePopularMoviesQuery } from '../../../../../hooks/usePopularMovies'
import { Alert } from 'react-bootstrap'
import 'react-multi-carousel/lib/styles.css';
import { responsive } from '../../../../../constants/responsive';
import MovieSlider from '../../../../../common/MovieSlider/MovieSlider';
import Spinner from '../../Spinner/Spinner';

const PopularMovieSlide = ({onMovieClick}) => {
    // 인기 영화 데이터를 불러오기 위한 커스텀 훅 사용
    const {data,isLoading,isError,error} = usePopularMoviesQuery()

    // 로딩 상태일 때 스피너 표시
    if(isLoading) {
        return <Spinner />
    }
    // 에러 발생 시 에러 메시지 출력
    if(isError) {
        return <Alert varient="danger">{error.massage}</Alert>
    }
    // 데이터가 없거나 형식이 잘못된 경우
    if (!data || !Array.isArray(data.results)) return <h1>No data available</h1>;
    return (
    <div>
        <MovieSlider 
        title="인기 영화" 
        movies={data.results} 
        responsive={responsive}
        onMovieClick={onMovieClick} 
        />
    </div>
  )
}

export default PopularMovieSlide