import { useState, useEffect } from 'react';
import { pb } from 'components/UserAuthentication';

function FollowButton(props) {
  async function deleteProject() {
    await pb.collection('connections').delete(props.connection);
  }

  const [isFollowing, setIsFollowing] = useState(true);

  const handleClick = async () => {
    if (!isFollowing) {
      
      setIsFollowing(true);
    } else {
     
      setIsFollowing(false);
    }
  };

  return (
    <button onClick={() => {handleClick; deleteProject()}} className={'border-2 w-32 bg-blue-500 mt-2 rounded-full bg-blue-400 hover:from-pink-500 hover:bg-blue-600 text-white'}>
       {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
}

export default FollowButton;