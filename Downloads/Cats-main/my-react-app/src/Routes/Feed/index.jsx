import { useState } from 'react';
import FeedPhotos from '../FeedPhotos';
import "./style.css";

function Feed() {
  const [page, setPage] = useState(1);
  const [infinite, setInfinite] = useState(true);
  const [modalPhoto, setModalPhoto] = useState(null);

  function handleInfiniteScroll(isInfinite) {
    if (isInfinite) {
      setPage((prevPage) => prevPage + 1);
      setInfinite(false);
    }
  }

  return (
    <div className='containerhome'>
      <FeedPhotos
        page={page}
        setModalPhoto={setModalPhoto}
        setInfinite={handleInfiniteScroll}
      />
      {modalPhoto && <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />}
    </div>
  );
}

export default Feed;
