import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const MovieModal = ({ show, handleClose, movie }) => {
  if (!movie) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* ✅ 예고편 (YouTube 트레일러 - 추후 실제 연동 가능) */}
        <div className="ratio ratio-16x9 mb-3">
          <iframe
            src={`https://www.youtube.com/embed/dQw4w9WgXcQ`} // 나중에 실제 trailer로 바꾸기
            title="Movie Trailer"
            allowFullScreen
          ></iframe>
        </div>

        <p><strong>줄거리:</strong> {movie.overview}</p>
        <p><strong>평점:</strong> {movie.vote_average}</p>
        <p><strong>성인 등급:</strong> {movie.adult ? "19+" : "전체 이용가"}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieModal;
