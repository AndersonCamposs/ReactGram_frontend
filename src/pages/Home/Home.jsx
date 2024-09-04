import './Home.css';

// COMPONENTS
import LikeContainer from '../../components/LikeContainer';
import PhotoItem from '../../components/PhotoItem';
import { Link } from 'react-router-dom';
// HOOKS
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';
// REDUX
import { getPhotos, likePhoto } from '../../slices/photoSlice';

const Home = () => {
  const [trigger, setTrigger] = useState(false);
  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch, setTrigger);

  const { user: authUser } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  // LOAD ALL PHOTOS
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  const handleLike = async (photo) => {
    dispatch(likePhoto(photo._id));

    resetMessage();
  };

  if (loading) {
    return <p></p>;
  }

  return (
    <div id="home">
      {/* Só faz o map após verificar se photos é realmente um array, 
      para que não ocorra TypeError (inicialmente, photos é um objeto) */}
      {photos &&
        Array.isArray(photos) &&
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={authUser} handleLike={() => handleLike(photo)} />
            <Link className="btn" to={`/photos/${photo._id}`}>
              Ver mais
            </Link>
          </div>
        ))}
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Ainda não há fotos publicadas, <Link to={`/users/${authUser._id}`}>clique aqui para adicionar uma foto.</Link>
        </h2>
      )}
    </div>
  );
};

export default Home;
