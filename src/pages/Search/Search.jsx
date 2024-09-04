import './Search.css';

// COMPONENTS
import LikeContainer from '../../components/LikeContainer';
import PhotoItem from '../../components/PhotoItem';
import { Link } from 'react-router-dom';

// HOOKS
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';
import { useQuery } from '../../hooks/useQuery';
import { searchPhotos, likePhoto } from '../../slices/photoSlice';
// REDUX

const Search = () => {
  const query = useQuery();
  const search = query.get('q');

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user: authUser } = useSelector((state) => state.auth);

  const { photos, loading } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(searchPhotos(search));
  }, [dispatch, search]);

  const handleLike = async (photo) => {
    dispatch(likePhoto(photo._id));

    resetMessage();
  };

  if (loading) {
    return <p></p>;
  }

  return (
    <div id="search">
      <h2>Você está buscando por: {search}</h2>
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
        <h2 className="no-photos">Não foram encontrados resultados para sua busca...</h2>
      )}
    </div>
  );
};

export default Search;
