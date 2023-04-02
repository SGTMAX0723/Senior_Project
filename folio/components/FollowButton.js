import { useState, useEffect } from 'react';
import { pb } from 'components/UserAuthentication';

function FollowButton(props) {
  const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
		setHydrated(true);
	}, []);
	if (!hydrated) {
		return null;
	}

  async function unfollow() {
    await pb.collection('connections').delete(props.connection);
    props.onUnfollow();
  }

  async function follow() {
    await pb.collection('connections').create({
      'follows': props.userId,
      'followed': props.followId,
    });
    props.onFollow();
  }

  return (
    <button onClick={() => {props.following && props.match || props.cardType === 'following'? unfollow() : follow()}} className={'border-2 w-32 bg-blue-500 mt-2 rounded-full hover:from-pink-500 hover:bg-blue-600 text-white'}>
        {props.following && props.match || props.cardType === 'following' ? 'Unfollow' : 'Follow'}
    </button>
  );
}

export default FollowButton;