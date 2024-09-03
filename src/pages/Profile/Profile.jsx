import './Profile.css';

import { uploads } from '../../utils/config';

// COMPONENTS
import Message from '../../components/Message';
import { Link } from 'react-router-dom';
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs';

// HOOKS
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// REDUX
import { getUserDetails } from '../../slices/userSlice';
import { publishPhoto, resetMessage, getUserPhotos, deletePhoto } from '../../slices/photoSlice';

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photo);

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [trigger, setTrigger] = useState(false);

  // NEW FORM AND EDIT FORM REFS
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  // LOAD USER DATA AND PREVENT FAIL INTO COMPONENT RE-RENDER
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUserDetails(id));
      await dispatch(getUserPhotos(id));
    };
    fetchData();
  }, [dispatch, id, trigger]);

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTrigger(false);

    const photoData = {
      title,
      image,
    };

    // BUILD FORM DATA
    const formData = new FormData();
    Object.keys(photoData).forEach((key) => formData.append(key, photoData[key]));

    formData.append('photo', photoData);

    await dispatch(publishPhoto(formData));

    setTitle('');

    setTrigger(!trigger);
  };

  // DELETE A PHOTO
  const handleDelete = async (photoId) => {
    setTrigger(false);
    await dispatch(deletePhoto(photoId));

    resetComponentMessage();
    setTrigger(!trigger);
  };

  const handleFile = (e) => {
    const image = e.target.files[0];

    setImage(image);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage && <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />}
        <div className="profile-description">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
      {id === userAuth._id && (
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Compartilhe suas experiências:</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
              <label>
                <span>Título para foto:</span>
                <input
                  type="text"
                  placeholder="Insira um título"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || ''}
                />
              </label>
              <label>
                <span>Imagem:</span>
                <input type="file" onChange={handleFile} />
              </label>
              {!loadingPhoto && <input type="submit" value="Postar" />}
              {loadingPhoto && <input type="submit" value="Aguarde..." />}
              {errorPhoto && <Message msg={errorPhoto} type="error" />}
              {messagePhoto && <Message msg={messagePhoto} type="success" />}
            </form>
          </div>
          <div className="user-photos">
            <h2>Fotos postadas:</h2>
            <div className="photos-container">
              {photos &&
                photos.photos &&
                photos.photos.map((photo) => (
                  <div className="photo" key={photo._id}>
                    {photo.image && <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />}
                    {id === userAuth._id ? (
                      <div className="actions">
                        <Link to={`/photos/${photo._id}`}>
                          <BsFillEyeFill />
                        </Link>
                        <BsPencilFill />
                        <BsXLg
                          onClick={() => {
                            handleDelete(photo._id);
                          }}
                        />
                      </div>
                    ) : (
                      <Link className="btn" to={`/photos/${photo._id}`}>
                        Ver
                      </Link>
                    )}
                  </div>
                ))}
              {photos.photos && photos.photos.length === 0 && <p>Ainda não há fotos publicadas.</p>}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
