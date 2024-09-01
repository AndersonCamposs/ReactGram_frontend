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

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);

  const { user: userAuth } = useSelector((state) => state.auth);

  // NEW FORM AND EDIT FORM REFS
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();
  // LOAD USER DATA
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
        {id === userAuth._id && (
          <>
            <div className="new-photo" ref={newPhotoForm}>
              <h3>Compartilhe suas experiências:</h3>
              <form onSubmit={(e) => handleSubmit(e)}>
                <label>
                  <span>Título para foto:</span>
                  <input type="text" placeholder="Insira um título" />
                </label>
                <label>
                  <span>Imagem:</span>
                  <input type="file" />
                </label>
                <input type="submit" value="Postar" />
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
