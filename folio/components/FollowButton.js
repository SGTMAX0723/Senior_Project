import { useState, useEffect } from 'react';
import { pb } from 'components/UserAuthentication';

function FollowButton({ /* following, userId, followId */ }) {



  const [isFollowing, setIsFollowing] = useState(false);

  const handleClick = async () => {
    if (!isFollowing) {
      
      setIsFollowing(true);
    } else {
     
      setIsFollowing(false);
    }
  };

  return (
    <button onClick={handleClick} className={'border-2 w-32 bg-blue-500 mt-2 rounded-full bg-blue-400 hover:from-pink-500 hover:bg-blue-600 text-white'}>
       {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
}

export default FollowButton;