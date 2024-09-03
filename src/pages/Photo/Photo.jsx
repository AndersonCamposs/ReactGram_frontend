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
import { getPhoto, likePhoto, commentPhoto } from '../../slices/photoSlice';

export const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector((state) => state.photo);

  const [trigger, setTrigger] = useState(false);

  const resetMessage = useResetComponentMessage(dispatch, setTrigger);

  // COMMENTS
  const [comment, setComment] = useState('');

  // LOAD PHOTO DATA
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id, trigger]);

  // INSERT A LIKE
  const handleLike = async () => {
    await dispatch(likePhoto(photo._id));
    resetMessage();
  };

  // INSERT A COMMENT
  const handleComment = async (e) => {
    e.preventDefault();

    const commentData = {
      comment,
      id: photo._id,
    };

    await dispatch(commentPhoto(commentData));

    setComment('');

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
      <div className="comments">
        {photo.comments && (
          <>
            <h3>Comentários: ({photo.comments.length})</h3>
            <form onSubmit={(e) => handleComment(e)}>
              <input
                type="text"
                placeholder="Insira o seu comentário..."
                onChange={(e) => setComment(e.target.value)}
                value={comment || ''}
              />
              <input type="submit" value="Enviar" />
            </form>
            {photo.comments.length === 0 && <p>Não há comentários...</p>}
            {photo.comments.map((comment, index) => (
              <div className="comment" key={index}>
                <div className="author">
                  {comment.userImage && <img src={`${uploads}/users/${comment.userImage}`} alt={comment.userName} />}
                  <Link to={`users/${comment.userId}`}>
                    <p>{comment.userName}</p>
                  </Link>
                </div>
                <p>{comment.comment}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Photo;
