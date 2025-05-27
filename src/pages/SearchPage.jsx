import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Spinner, Alert } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useSearchMovieQuery } from '../hooks/useSearchMovie';
import MovieCard from '../common/MovieCard/MovieCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 7 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 5 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 3 },
};

const SearchPage = () => {
  const [query] = useSearchParams();
  const keyword = query.get("q");
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  if (!keyword) return <Alert variant="warning">검색어를 입력해주세요.</Alert>;
  if (isLoading) return <Spinner animation="border" variant="danger" />;
  if (isError) return <Alert variant="danger">{error.message}</Alert>;

  const movies = data?.results?.filter((m) => m.poster_path);

  return (
    <Container className="mt-5">
      <h2>검색 결과: "{keyword}"</h2>

      {movies?.length > 0 ? (
        <Carousel
          responsive={responsive}
          autoPlay={false}
          infinite={false}
          arrows={true}
          itemClass="carousel-item-padding"
          containerClass="carousel-container"
        >
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </Carousel>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}

      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={Math.min(data?.total_pages || 0, 20)}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination justify-content-center mt-4"
        activeClassName="active"
        forcePage={page - 1}
      />
    </Container>
  );
};

export default SearchPage;
