import React, {useState} from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { useSearchParams } from 'react-router-dom'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { Alert } from 'bootstrap'
import MovieCard from '../../common/MovieCard/MovieCard'
import ReactPaginate from 'react-paginate';




const MoviePage = () => {
  const[query,setQuery] = useSearchParams();
  const keyword = query.get("q");
  const [page, setPage] = useState(1);
  const {data,isLoading,isError,error} = useSearchMovieQuery({keyword, page})
  

  const handlePageClick = ({selected}) => {
    setPage(selected + 1);
  }
  
  
  if (isLoading) {
    return (
      <div className="spinner-area">
        <Spinner
        animation="border"
        variant="danger"
        style={{ width: "5rem", height: "5rem" }}
        />
      </div> 
    )
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>
  }
  return (
   <Container>
    <Row>
      <Col lg={4} xs={12}> 
      {" "}
      필터{" "}
      </Col>
      
      <Col lg={8} xs={12}> 
      <Row>
      {Array.isArray(data?.results) &&
      data.results.map((movie, index) => (
        <Col key={index} lg={4} xs={12}>
          <MovieCard movie={movie} />
        </Col>
    ))}
        </Row>
        <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={Math.min(data?.total_pages || 0, 20)} // 전체페이지가 몇개인지를 알려줘야됨
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
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={page - 1}
      />
      </Col>
    </Row>
  </Container>
  )
}

export default MoviePage