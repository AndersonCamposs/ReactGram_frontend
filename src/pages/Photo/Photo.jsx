import './Photo.css';

import { uploads } from '../../utils/config';

// COMPONENTS
import Message from '../../components/Message';
import { Link } from 'react-router-dom';
import PhotoItem from '../../components/PhotoItem';
import LikeContainer from '../../components/LikeContainer';

// HOOKS
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';

// REDUX
import { getPhoto, likePhoto } from '../../slices/photoSlice';

export const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector((state) => state.photo);

  const [trigger, setTrigger] = useState(false);

  const resetMessage = useResetComponentMessage(dispatch, setTrigger);

  // COMMENTS

  // LOAD PHOTO DATA
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id, trigger]);

  // LIKE AND COMMENT
  const handleLike = async () => {
    await dispatch(likePhoto(photo._id));
    resetMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className="message-container">
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </div>
    </div>
  );
};

export default Photo;
