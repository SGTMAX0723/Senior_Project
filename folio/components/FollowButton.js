import { useState, useEffect } from 'react';
import { pb } from 'components/UserAuthentication';

function FollowButton({ following, userId, followId }) {
  const [isFollowing, setIsFollowing] = useState(following);
  

  useEffect(() => {
    async function checkFollowing() {
      try {
        // Fetch the list of connections for the current user
        const connections = await pb.collection('connections').getList(1, 1000, {
          filter: `follower = "${userId}" and followed = "${followId}"`,
        });
        setIsFollowing(connections.items.length > 0);
      } catch (error) {
        console.error(error);
      }
    }

    checkFollowing();
  }, [userId, followId]);

  
  async function handleClick() {
    try {
      if (isFollowing) {
        // User clicked "unfollow"
        await pb.collection('connections').deleteOne(followId);
        setIsFollowing(false);
      } else {
        // User clicked "follow"
        const connection = await pb.collection('connections').create({
          follower: userId,
          followed: followId,
        });
        setIsFollowing(true);
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <button onClick={handleClick} className={'border-2 w-32 bg-gradient-to-r from-green-400 to-blue-500 mt-2 rounded bg-blue-400 hover:from-pink-500 hover:to-yellow-500 text-white'}>
      {isFollowing ? 'Unfollow' : 'Follow'} 
    </button>
  );
}

export default FollowButton;