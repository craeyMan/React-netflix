import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function MovieModal({ show, onClose, movie }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{movie?.title || '영화 제목'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{movie?.overview || '설명 없음'}</p>
      </Modal.Body>

      <Modal.Footer>
        
      </Modal.Footer>
    </Modal>
  );
}
