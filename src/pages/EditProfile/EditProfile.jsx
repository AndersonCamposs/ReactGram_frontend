import './EditProfile.css';

import { uploads } from '../../utils/config';

// HOOKS
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// REDUX
import { profile, resetMessage, updateProfile } from '../../slices/userSlice';

// COMPONENTS
import Message from '../../components/Message';

const EditProfile = () => {
  const dispatch = useDispatch();

  const { user, message, error, loading } = useSelector((state) => state.user);
  // STATES
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [bio, setBio] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  // LOAD USER DATA
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  // FILL FORM WITH USER DATA
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // GET USER DATA FORM STATES
    const userData = {
      name,
    };

    if (profileImage) {
      userData.profileImage = profileImage;
    }

    if (bio) {
      userData.bio = bio;
    } else {
      userData.bio = '';
    }

    if (password) {
      userData.password = password;
    }

    // BUILD A FORMDATA
    const formData = new FormData();

    Object.keys(userData).forEach((key) => formData.append(key, userData[key]));

    formData.append('user', userData);

    await dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 3000);
  };

  const handleFile = (e) => {
    // IMAGE PREVIEW
    const image = e.target.files[0];

    setPreviewImage(image);

    // UPDATE IMAGE STATE
    setProfileImage(image);
  };

  return (
    <div id="edit-profile">
      <h2>Edite seus dados</h2>
      <p className="subtitle">Adicione uma imagem de perfil e conte mais sobre você...</p>
      {(user.profileImage || previewImage) && (
        <img
          className="profile-image"
          src={previewImage ? URL.createObjectURL(previewImage) : `${uploads}/users/${user.profileImage}`}
          alt={user.name}
        />
      )}
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} value={name || ''} />
        <input
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ''}
          disabled
        />
        <label>
          <span>Imagem do perfil:</span>
          <input type="file" onChange={(e) => handleFile(e)} />
        </label>
        <label>
          <span>Biografia:</span>
          <input
            type="text"
            placeholder="Descrição do perfil"
            onChange={(e) => setBio(e.target.value)}
            value={bio || ''}
          />
        </label>
        <label>
          <span>Alterar senha:</span>
          <input
            type="password"
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ''}
          />
        </label>
        {!loading && <input type="submit" value="Atualizar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
};

export default EditProfile;
