import { useState } from 'react';
import FeedPhotos from '../FeedPhotosHome';
import FeedModal from "../Routes/FeedModal";  // Caminho corrigido

function FeedHome() {
  const [page, setPage] = useState(1);
  const [modalPhoto, setModalPhoto] = useState(null);

  function handleInfiniteScroll(isInfinite) {
    if (isInfinite) {
      setPage((prevPage) => prevPage + 10);
    }
  }

  return (
    <div>
      <FeedPhotos
        page={page}
        setModalPhoto={setModalPhoto}
        setInfinite={handleInfiniteScroll}
      />
      {modalPhoto && <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />}
    </div>
  );
}

export default FeedHome;
