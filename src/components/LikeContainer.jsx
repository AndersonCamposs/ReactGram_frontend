import './LikeContainer.css';

import PropTypes from 'prop-types';

import { BsHeart, BsHeartFill } from 'react-icons/bs';

const LikeContainer = ({ photo, user, handleLike }) => {
  return (
    <div className="like">
      {photo.likes && user && (
        <>
          {photo.likes.includes(user._id) ? <BsHeartFill /> : <BsHeart onClick={() => handleLike()} />}
          <p>{photo.likes.length} likes(s)</p>
        </>
      )}
    </div>
  );
};

LikeContainer.propTypes = {
  photo: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
};

export default LikeContainer;
